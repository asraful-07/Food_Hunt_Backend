import { Roles } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Asraful Islam",
      email: "asraful0508@gmail.com",
      role: Roles.ADMIN,
      password: "password1234",
    };

    const existsUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existsUser) {
      throw new Error("User already exists!!");
    }

    const signupAdmin = await fetch(
      "http://localhost:5002/api/auth/sign-up/email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      },
    );

    if (signupAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }

    console.log("Admin seeded successfully");
  } catch (err: any) {
    console.error(err);
  }
}

seedAdmin();
