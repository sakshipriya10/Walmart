import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tryCloth = async (req, res) => {
  try {
    const userImgPath = req.files.userImage[0].path;
    const clothImgPath = req.files.itemImage[0].path;
    const outputPath = `uploads/result-${Date.now()}.jpg`;

    const scriptPath = path.join(__dirname, "../../ML/overlay_cloth.py");

    exec(
  `python ${scriptPath} ${userImgPath} ${clothImgPath} ${outputPath}`,
  (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Overlay failed");
      console.error("stderr:", stderr);  // <-- show Python errors
      console.error("stdout:", stdout);
      return res
        .status(500)
        .json({ message: "Overlay failed", error: err, stderr });
    }

    res.sendFile(path.resolve(outputPath));
  }
);

  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};
