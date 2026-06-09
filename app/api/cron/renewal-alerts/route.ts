//  import { connectDB } from "@/lib/db";
// import { Certification } from "@/models";
// import { Notification } from "@/models/Notification";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// /**
//  * ---------------------------
//  * CONFIG
//  * ---------------------------
//  */
// const THRESHOLDS = [30, 15, 7];

// /**
//  * ---------------------------
//  * AUTH CHECK (CRON SECRET)
//  * ---------------------------
//  */
// function verifyCron(req: NextRequest) {
//   const authHeader = req.headers.get("authorization");
//   return authHeader === `Bearer ${process.env.CRON_SECRET}`;
// }

// /**
//  * ---------------------------
//  * POST - CRON JOB
//  * ---------------------------
//  */
// export async function POST(req: NextRequest) {
//   try {
//     if (!verifyCron(req)) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     const User = mongoose.models.User;
//     const now = new Date();

//     let alertsSent = 0;

//     /**
//      * ---------------------------
//      * CERTIFICATION RENEWAL ALERTS
//      * ---------------------------
//      */
//     for (const days of THRESHOLDS) {
//       const target = new Date(Date.now() + days * 86400000);

//       const start = new Date(target);
//       start.setHours(0, 0, 0, 0);

//       const end = new Date(target);
//       end.setHours(23, 59, 59, 999);

//       const certs = await Certification.find({
//         renewalDate: { $gte: start, $lte: end },
//       })
//         .populate("client", "companyLegalName")
//         .populate("assignedConsultant", "_id");

//       for (const cert of certs) {
//         const admins = await User.find(
//           { role: { $in: ["Admin", "Management"] } },
//           "_id"
//         );

//         const userIds = new Set<string>();

//         admins.forEach((u: any) => userIds.add(u._id.toString()));

//         if (cert.assignedConsultant?._id) {
//           userIds.add(cert.assignedConsultant._id.toString());
//         }

//         /**
//          * ID for idempotency (avoid duplicates)
//          */
//         const notificationKey = `${cert._id}-${days}`;

//         for (const userId of userIds) {
//           const exists = await Notification.findOne({
//             userId,
//             dedupeKey: notificationKey,
//           });

//           if (exists) continue;

//           await Notification.create({
//             userId,
//             title: `🔄 Renewal Due in ${days} Days`,
//             message: `${cert.client?.companyLegalName || "Client"} — ${
//               cert.certificationType
//             } (${cert.applicationId}) renewal on ${new Date(
//               cert.renewalDate
//             ).toLocaleDateString("en-IN")}`,

//             type: "renewal",
//             link: `/certifications?highlight=${cert._id}`,
//             relatedId: cert._id,
//             relatedModel: "Certification",

//             /**
//              * 🔥 IMPORTANT: prevents duplicate notifications
//              */
//             dedupeKey: notificationKey,
//           });

//           alertsSent++;
//         }
//       }
//     }

//     /**
//      * ---------------------------
//      * OVERDUE TASK ALERTS
//      * ---------------------------
//      */
//     const Task = mongoose.models.Task;

//     if (Task) {
//       const overdueTasks = await Task.find({
//         status: { $ne: "Completed" },
//         dueDate: { $lt: now },
//         reminderSent: { $ne: true },
//       })
//         .populate("assignedTo", "_id")
//         .limit(100);

//       for (const task of overdueTasks) {
//         if (!task.assignedTo?._id) continue;

//         const exists = await Notification.findOne({
//           relatedId: task._id,
//           type: "task_due",
//         });

//         if (exists) continue;

//         await Notification.create({
//           userId: task.assignedTo._id,
//           title: "⏰ Task Overdue",
//           message: `"${task.title}" was due on ${new Date(
//             task.dueDate
//           ).toLocaleDateString("en-IN")}`,
//           type: "task_due",
//           link: "/tasks",
//           relatedId: task._id,
//           relatedModel: "Task",
//           dedupeKey: `task-${task._id}`,
//         });

//         await Task.findByIdAndUpdate(task._id, {
//           reminderSent: true,
//         });

//         alertsSent++;
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       alertsSent,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (err) {
//     console.error("CRON_ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: "Cron failed" },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * ---------------------------
//  * GET (DEV TEST ONLY)
//  * ---------------------------
//  */
// export async function GET(req: NextRequest) {
//   if (process.env.NODE_ENV !== "development") {
//     return NextResponse.json(
//       { error: "Dev only" },
//       { status: 403 }
//     );
//   }

//   return POST(
//     new Request("http://localhost/api", {
//       method: "POST",
//       headers: {
//         authorization: `Bearer ${process.env.CRON_SECRET || "dev"}`,
//       },
//     }) as any
//   );
// }

 
 import { connectDB } from "@/lib/db";
import { Certification, Notification } from "@/models";
 
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ---------------------------
 * CONFIG
 * ---------------------------
 */
const THRESHOLDS = [30, 15, 7];

/**
 * ---------------------------
 * TYPES
 * ---------------------------
 */
type PopulatedClient = {
  companyLegalName?: string;
};

type PopulatedConsultant = {
  _id?: string | mongoose.Types.ObjectId;
};

type CertificationDoc = {
  _id: mongoose.Types.ObjectId;
  client?: mongoose.Types.ObjectId | PopulatedClient;
  assignedConsultant?:
    | mongoose.Types.ObjectId
    | PopulatedConsultant;
  certificationType?: string;
  applicationId?: string;
  renewalDate?: Date | string;
};

/**
 * ---------------------------
 * AUTH CHECK (CRON SECRET)
 * ---------------------------
 */
function verifyCron(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

/**
 * ---------------------------
 * POST - CRON JOB
 * ---------------------------
 */
export async function POST(req: NextRequest) {
  try {
    if (!verifyCron(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const User = mongoose.models.User;
    const now = new Date();

    let alertsSent = 0;

    /**
     * ---------------------------
     * CERTIFICATION RENEWAL ALERTS
     * ---------------------------
     */
    for (const days of THRESHOLDS) {
      const target = new Date(Date.now() + days * 86400000);

      const start = new Date(target);
      start.setHours(0, 0, 0, 0);

      const end = new Date(target);
      end.setHours(23, 59, 59, 999);

      const certs = (await Certification.find({
        renewalDate: {
          $gte: start,
          $lte: end,
        },
      })
        .populate("client", "companyLegalName")
        .populate("assignedConsultant", "_id")) as CertificationDoc[];

      for (const cert of certs) {
        const admins = await User.find(
          {
            role: { $in: ["Admin", "Management"] },
          },
          "_id"
        );

        const userIds = new Set<string>();

        admins.forEach((u: any) =>
          userIds.add(u._id.toString())
        );

        const assignedConsultant =
          cert.assignedConsultant as PopulatedConsultant;

        if (assignedConsultant?._id) {
          userIds.add(
            assignedConsultant._id.toString()
          );
        }

        /**
         * ID for idempotency
         */
        const notificationKey = `${cert._id}-${days}`;

        const client =
          cert.client as PopulatedClient;

        const renewalDate = cert.renewalDate
          ? new Date(cert.renewalDate)
          : new Date();

        for (const userId of userIds) {
          const exists = await Notification.findOne({
            userId,
            dedupeKey: notificationKey,
          });

          if (exists) continue;

          await Notification.create({
            userId,

            title: `🔄 Renewal Due in ${days} Days`,

            message: `${
              client?.companyLegalName || "Client"
            } — ${cert.certificationType || "Certification"} (${
              cert.applicationId || "N/A"
            }) renewal on ${renewalDate.toLocaleDateString(
              "en-IN"
            )}`,

            type: "renewal",

            link: `/certifications?highlight=${cert._id}`,

            relatedId: cert._id,

            relatedModel: "Certification",

            /**
             * Prevent duplicate notifications
             */
            dedupeKey: notificationKey,
          });

          alertsSent++;
        }
      }
    }

    /**
     * ---------------------------
     * OVERDUE TASK ALERTS
     * ---------------------------
     */
    const Task = mongoose.models.Task;

    if (Task) {
      const overdueTasks = await Task.find({
        status: { $ne: "Completed" },
        dueDate: { $lt: now },
        reminderSent: { $ne: true },
      })
        .populate("assignedTo", "_id")
        .limit(100);

      for (const task of overdueTasks) {
        const assignedTo =
          task.assignedTo as PopulatedConsultant;

        if (!assignedTo?._id) continue;

        const exists = await Notification.findOne({
          relatedId: task._id,
          type: "task_due",
        });

        if (exists) continue;

        await Notification.create({
          userId: assignedTo._id,

          title: "⏰ Task Overdue",

          message: `"${task.title}" was due on ${new Date(
            task.dueDate
          ).toLocaleDateString("en-IN")}`,

          type: "task_due",

          link: "/tasks",

          relatedId: task._id,

          relatedModel: "Task",

          dedupeKey: `task-${task._id}`,
        });

        await Task.findByIdAndUpdate(task._id, {
          reminderSent: true,
        });

        alertsSent++;
      }
    }

    return NextResponse.json({
      success: true,
      alertsSent,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("CRON_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Cron failed",
      },
      { status: 500 }
    );
  }
}

/**
 * ---------------------------
 * GET (DEV TEST ONLY)
 * ---------------------------
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Dev only" },
      { status: 403 }
    );
  }

  return POST(
    new Request("http://localhost/api", {
      method: "POST",
      headers: {
        authorization: `Bearer ${
          process.env.CRON_SECRET || "dev"
        }`,
      },
    }) as any
  );
}