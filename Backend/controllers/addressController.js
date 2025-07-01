import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: "Failed to add address" });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete address" });
  }
};
