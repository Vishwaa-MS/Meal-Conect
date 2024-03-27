const mongoose = require("mongoose");

const donorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: Number, required: true },
    pic: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmooresvilletribune.com%2Fnews%2Flocal%2Folive-garden-restaurants-donate-food-to-fight-hunger%2Farticle_e806aeac-989b-11ee-b357-034f9ab135cd.html&psig=AOvVaw2nXtaJBR5BTSM_PBws7V-G&ust=1710781888042000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOiL_brl-4QDFQAAAAAdAAAAABAF",
    },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
