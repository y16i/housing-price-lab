import { db } from "../app/lib/db/index";
import { houses } from "../app/lib/db/schema";
import dummyData from "../app/api/dummy-data.json";

async function seed() {
  try {
    console.log("Starting seed...");
    
    // Insert dummy data with conflict handling
    await db
      .insert(houses)
      .values(dummyData)
      .onConflictDoNothing();
    
    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
