using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Text;

namespace ImageWatermarker;

class Program
{
    static void Main(string[] args)
    {
        if (args.Length > 0 && (args[0] == "-h" || args[0] == "--help"))
        {
            Console.WriteLine("Image Watermarker");
            Console.WriteLine("This tool adds a semi-transparent watermark to all JPEG images in the specified assets folder.");
            Console.WriteLine("The watermarked images are saved in a 'watermarked' subfolder.");
            Console.WriteLine("Usage: dotnet run --project ImageWatermarker [assets-folder-path]");
            Console.WriteLine("       dotnet run --project ImageWatermarker --help");
            Console.WriteLine();
            Console.WriteLine("Arguments:");
            Console.WriteLine("  assets-folder-path    Path to the folder containing JPEG images (optional, will prompt if not provided)");
            Console.WriteLine("  -h, --help           Show this help message");
            return;
        }
        // if the -t flag is provided, run in test mode (process only 10 images)
        bool isTestMode = args.Contains("-t");

        // parse the assets folder path from args or prompt the user
        string assetsFolder;
        if (args.Length > 0)
        {
            assetsFolder = args[0];
        }
        else
        {
            Console.Write("Enter the path to the assets folder: ");
            assetsFolder = Console.ReadLine() ?? string.Empty;
        }

        if (!Directory.Exists(assetsFolder))
        {
            Console.WriteLine("The specified assets folder does not exist.");
            return;
        }

        var originalsFolder = Path.Combine(assetsFolder, "originals");
        if (!Directory.Exists(originalsFolder))
        {
            // Assume images are directly in the assets folder
            // first move them to an "originals" subfolder

            Directory.CreateDirectory(originalsFolder);
            var imageFiles = Directory.GetFiles(assetsFolder, "*.jpg", SearchOption.TopDirectoryOnly)
                .Concat(Directory.GetFiles(assetsFolder, "*.jpeg", SearchOption.TopDirectoryOnly))
                .ToList();
            foreach (var file in imageFiles)
            {
                var destPath = Path.Combine(originalsFolder, Path.GetFileName(file));
                File.Move(file, destPath);
            }
            Console.WriteLine($"Moved {imageFiles.Count} images to 'originals' subfolder.");
        }

        // Configuration
        string outputFolder = assetsFolder;
        string watermarkText = "© 2026 Loïc Larno";
        
        Console.WriteLine($"Processing images in: {originalsFolder}");
        Console.WriteLine($"Output folder: {assetsFolder}");
        
        // Get all JPEG files
        var jpegFiles = Directory.GetFiles(originalsFolder, "*.jpg", SearchOption.TopDirectoryOnly)
            .Concat(Directory.GetFiles(originalsFolder, "*.jpeg", SearchOption.TopDirectoryOnly))
            .ToList();
        
        Console.WriteLine($"Found {jpegFiles.Count} JPEG files to process.\n");
        
        int processed = 0;
        foreach (var filePath in jpegFiles)
        {
            if (isTestMode && processed % 10 != 0)
            {
                processed++;
                continue;
            }
            try
            {
                string fileName = Path.GetFileName(filePath);
                string outputPath = Path.Combine(outputFolder, fileName);
                
                AddWatermark(filePath, outputPath, watermarkText);
                processed++;
                Console.WriteLine($"[{processed}/{jpegFiles.Count}] Processed: {fileName}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing {Path.GetFileName(filePath)}: {ex.Message}");
            }
        }
        
        Console.WriteLine($"\nCompleted! Processed {processed} out of {jpegFiles.Count} images.");
        Console.WriteLine($"Watermarked images saved to: {outputFolder}");
    }
    
#pragma warning disable CA1416 // Validate platform compatibility
    static void AddWatermark(string inputPath, string outputPath, string watermarkText)
    {
        using var originalImage = new Bitmap(inputPath);
        using var graphics = Graphics.FromImage(originalImage);
        
        // Set high quality rendering
        graphics.SmoothingMode = SmoothingMode.AntiAlias;
        graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
        graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
        
        // Calculate font size based on image dimensions (roughly 0.2% of image width)
        float fontSize = originalImage.Width * 0.002f;
        using var font = new Font("Arial", fontSize, FontStyle.Bold);
        
        // Measure text size
        var textSize = graphics.MeasureString(watermarkText, font);
        
        // Position watermark at bottom-right corner with padding
        float paddingX = originalImage.Width * 0.03f;
        float paddingY = originalImage.Height * 0.03f;
        float x = originalImage.Width - textSize.Width - paddingX;
        float y = originalImage.Height - textSize.Height - paddingY;
        
        // Create semi-transparent background for better readability
        using var backgroundBrush = new SolidBrush(Color.FromArgb(120, 0, 0, 0));
        var backgroundRect = new RectangleF(
            x - 10,
            y - 5,
            textSize.Width + 20,
            textSize.Height + 10
        );
        graphics.FillRectangle(backgroundBrush, backgroundRect);
        
        // Draw watermark text with semi-transparency
        using var textBrush = new SolidBrush(Color.FromArgb(200, 255, 255, 255));
        graphics.DrawString(watermarkText, font, textBrush, x, y);

        // Add copyright metadata to EXIF properties
        AddCopyrightMetadata(originalImage, watermarkText);

        // Save the watermarked image
        originalImage.Save(outputPath, ImageFormat.Jpeg);
    }

    static void AddCopyrightMetadata(Image image, string copyrightText)
    {
        try
        {
            // Property IDs for EXIF metadata
            const int PropertyTagCopyright = 0x8298;      // Copyright
            const int PropertyTagArtist = 0x013B;          // Artist
            const int PropertyTagImageDescription = 0x010E; // Image Description
            
            // Set Copyright property
            SetPropertyItem(image, PropertyTagCopyright, copyrightText);
            
            // Set Artist property
            SetPropertyItem(image, PropertyTagArtist, "Loïc Larno");
            
            // Set Image Description
            SetPropertyItem(image, PropertyTagImageDescription, $"Copyright {copyrightText}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Warning: Could not add metadata: {ex.Message}");
        }
    }

    static void SetPropertyItem(Image image, int propertyId, string value)
    {
        try
        {
            // Convert string to UTF-8 bytes for proper encoding of special characters
            byte[] bytes = Encoding.UTF8.GetBytes(value + "\0"); // Null-terminated string
            
            PropertyItem propertyItem;
            
            // Try to get an existing property item to use as a template
            var existingProperties = image.PropertyItems;
            if (existingProperties.Length > 0)
            {
                propertyItem = existingProperties[0];
            }
            else
            {
                // If no properties exist, we need to create from scratch
                // This requires reflection or using a dummy image
                return;
            }
            
            propertyItem.Id = propertyId;
            propertyItem.Type = 2; // ASCII/UTF-8 string
            propertyItem.Len = bytes.Length;
            propertyItem.Value = bytes;
            
            image.SetPropertyItem(propertyItem);
        }
        catch
        {
            // Silently fail if property cannot be set
        }
    }
#pragma warning restore CA1416 // Validate platform compatibility

}
