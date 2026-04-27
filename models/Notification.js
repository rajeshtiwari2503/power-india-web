// models/Notification.js - Add to models/index.js

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["renewal", "task_due", "lead_assigned", "payment_due", "cert_update", "system"],
    default: "system",
  },
  link: { type: String }, // e.g. /certifications?id=xxx
  isRead: { type: Boolean, default: false },
  relatedId: { type: mongoose.Schema.Types.ObjectId }, // cert/lead/task id
  relatedModel: { type: String }, // "Certification", "Lead", "Task"
}, { timestamps: true });

notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);