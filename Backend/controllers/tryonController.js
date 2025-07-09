import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// For __dirname support in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tryCloth = async (req, res) => {
  try {
    // Ensure both files are received
    if (!req.files?.userImage || !req.files?.itemImage) {
      return res.status(400).json({ message: "Both images are required." });
    }

    const userImgPath = req.files.userImage[0].path;
    const clothImgPath = req.files.itemImage[0].path;

    // Ensure uploads folder exists
    const uploadsDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    // Output result path
    const outputPath = path.join(uploadsDir, `result-${Date.now()}.jpg`);

    // Path to Python script
    const scriptPath = path.join(__dirname, "../../ML/overlay_cloth.py");

    // Safer exec command with quotes
    const command = `python "${scriptPath}" "${userImgPath}" "${clothImgPath}" "${outputPath}"`;

    console.log("▶️ Running command:", command);

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Overlay failed");
        console.error("stderr:", stderr);
        console.error("stdout:", stdout);
        return res.status(500).json({
          message: "Overlay failed",
          error: err.message,
          stderr,
          stdout,
        });
      }

      console.log("✅ Overlay successful. Sending file:", outputPath);

      // Serve result file
      res.sendFile(path.resolve(outputPath), (err) => {
        if (!err) {
          // Optional cleanup after sending
          fs.unlink(userImgPath, () => {});
          fs.unlink(clothImgPath, () => {});
          // fs.unlink(outputPath, () => {}); // Uncomment if you want to auto-delete result too
        }
      });
    });

  } catch (err) {
    console.error("❗ Internal server error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
};
