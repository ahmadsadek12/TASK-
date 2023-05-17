const mongoose = require("mongoose");

const notifSchema = mongoose.Schema({
    created_for:
    {
        type: String,
        required: true,
    },
    creator: {
        type: Object,
        required: true,
    },
    type_id: {
        type: Number,
        required: true,
    },
    extra_data: {
        type: Object,
    },
    work_request: {
        type: String,
    },
    offer: {
        type: String,
    },
    is_approved: { type: Boolean, default: false },
    is_rejected: { type: Boolean, default: false },
    is_pending: { type: Boolean, default: true },
},
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notifSchema);

