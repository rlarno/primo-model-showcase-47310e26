# Image Watermarker

A C# console application to add copyright watermarks to JPEG images in the assets folder and embed copyright metadata.

## Features

- Processes all JPEG files in the `src/assets` folder
- Automatically moves original images to `src/assets/originals/` subfolder on first run
- Adds "© 2026 Loïc Larno" watermark to the bottom-right corner with semi-transparent background
- Embeds copyright metadata in EXIF properties:
  - **Copyright** - Full copyright text
  - **Artist** - "Loïc Larno"
  - **Image Description** - Copyright notice
- Automatic font sizing based on image dimensions
- High-quality anti-aliased rendering
- UTF-8 encoding for proper handling of special characters
- Saves watermarked images to `src/assets/` folder
- Original images are preserved in `src/assets/originals/`

## Requirements

- .NET 8.0 SDK or later
- System.Drawing.Common package (included in project)

## Usage

1. Navigate to the ImageWatermarker directory:
   ```bash
   cd ImageWatermarker
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application with the assets folder path:
   ```bash
   dotnet run S:\source\primo-model-showcase-47310e26\src\assets\
   ```

   Or run interactively (will prompt for folder):
   ```bash
   dotnet run
   ```

4. Optional test mode (processes every 10th image):
   ```bash
   dotnet run S:\source\primo-model-showcase-47310e26\src\assets\ -t
   ```

5. View help:
   ```bash
   dotnet run --project ImageWatermarker --help
   ```

## First Run Behavior

On the first run, the application will:
1. Check if an `originals` subfolder exists in the assets folder
2. If not, automatically move all JPEG files to `src/assets/originals/`
3. Process images from the `originals` folder
4. Save watermarked versions back to `src/assets/`

This ensures original files are always preserved and organized.

## Configuration

You can modify the following in `Program.cs`:

- **Watermark text**: Change the `watermarkText` variable (e.g., "© 2026 Loïc Larno")
- **Font size**: Adjust the `fontSize` calculation (currently 0.2% of image width)
- **Position**: Modify `paddingX` and `paddingY` values (currently 3% of image dimensions)
- **Transparency**: Change the alpha values in `Color.FromArgb()` calls
  - Background transparency: 120 (out of 255)
  - Text transparency: 200 (out of 255)
- **Font style**: Update the `Font` constructor parameters (currently Arial, Bold)

### EXIF Metadata Properties

The application adds the following EXIF metadata:
- **Copyright (0x8298)**: Contains the watermark text
- **Artist (0x013B)**: Contains "Loïc Larno"
- **Image Description (0x010E)**: Contains "Copyright {watermarkText}"

## Verification

You can verify the watermark and metadata by:

1. **Visual watermark**: Open the image in any image viewer
2. **EXIF metadata**:
   - Right-click the image → Properties → Details tab (Windows)
   - Use exiftool: `exiftool imagename.jpg`
   - Use online EXIF viewers
   - Check in photo management software (Photos, Lightroom, etc.)

## Output

- Original images: Saved to `src/assets/originals/` (moved on first run)
- Watermarked images: Saved to `src/assets/`
- All metadata embedded with UTF-8 encoding for special character support
- Original files are never modified or deleted

