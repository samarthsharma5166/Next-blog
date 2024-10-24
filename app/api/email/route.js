import { connectDB } from "@/lib/config/db";
import emailModel from "@/lib/models/EmailModel.js";
import { NextResponse } from "next/server";

const LoadDb = async () => {
  await connectDB();
};
LoadDb();
export async function POST(req) {
  const formData = await req.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await emailModel.create(emailData);
  return NextResponse.json({ success: true,msg:"Email subscribed" });
}

export default async function GET(req, res) {
 
    try {// Connect to the database
      const emails = await emailModel.find();
      return res.status(200).json({ emails });
    } catch (error) {
      console.error("Failed to fetch emails:", error);
      return res.status(500).json({ error: "Failed to fetch emails" });
    
    }
}