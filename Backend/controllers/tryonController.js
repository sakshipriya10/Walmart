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
      (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Overlay failed", error: err });
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
