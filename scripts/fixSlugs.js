require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");
const slugify = require("slugify");

async function fixSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // apna .env variable name check kar le

    const jobs = await Job.find({ slug: { $in: [null, undefined, ""] } });

    for (const job of jobs) {
      job.slug = slugify(job.title, { lower: true, strict: true });
      await job.save();
    }

    console.log(`✅ Fixed ${jobs.length} jobs`);
  } catch (error) {
    console.error("Error fixing slugs:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

fixSlugs();