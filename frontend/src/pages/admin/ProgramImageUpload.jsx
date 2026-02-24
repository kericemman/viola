import { uploadImage } from "../../services/upload.service";

const ProgramImageUpload = ({ onUpload }) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await uploadImage(file);
    onUpload(result.url);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="block"
    />
  );
};

export default ProgramImageUpload;
