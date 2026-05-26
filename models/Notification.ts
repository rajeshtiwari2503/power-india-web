 import mongoose, { InferSchemaType, Model } from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    message: { type: String, required: true },

    type: {
      type: String,
      enum: [
        "renewal",
        "task_due",
        "lead_assigned",
        "payment_due",
        "cert_update",
        "system",
      ],
      default: "system",
    },

    link: { type: String }, // e.g. /certifications?id=xxx

    isRead: { type: Boolean, default: false },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    relatedModel: {
      type: String, // "Certification", "Lead", "Task"
    },

    /**
     * Used for idempotency (cron / reminders).
     * When present, we ensure uniqueness per user.
     */
    dedupeKey: { type: String },
  },
  { timestamps: true }
);

// =========================
// INDEX (performance)
// =========================
notificationSchema.index({
  userId: 1,
  isRead: 1,
  createdAt: -1,
});

// Avoid duplicate notifications per user+key (sparse allows null/undefined).
notificationSchema.index(
  { userId: 1, dedupeKey: 1 },
  { unique: true, sparse: true }
);

// =========================
// TypeScript Type
// =========================
export type NotificationType = InferSchemaType<typeof notificationSchema>;

// =========================
// Safe Model Export (Next.js)
// =========================
export const Notification: Model<NotificationType> =
  mongoose.models.Notification ||
  mongoose.model<NotificationType>(
    "Notification",
    notificationSchema
  );