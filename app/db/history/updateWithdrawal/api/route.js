import { NextResponse } from "next/server";
import UserModel from "../../../../../mongodbConnect";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { email, transactionId, newStatus, amount, name, method } =
    await request.json();
  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Use the function to generate a 16-character long string
  const randomString = generateRandomString(30);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "itrustcapital01@gmail.com",
      pass: "wjnq ipya jsez htjy",
    },
  });
  const mailOptions = {
    from: "ITrustCapital <support@itruscapitalira.com>",
    to: email, // Recipient's email address
    subject: `Withdrawal Confirmation of $${amount}`,
    html: `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Confirmation</title>
    <style>
        /* Reset some default styles */
        body, h1 {
            margin: 0;
            padding: 0;
        }

        /* Styles for the email body */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        /* Styles for the email container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Header styles */
        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        /* Title styles */
        h1 {
            color: #333;
            font-size: 24px;
        }

        /* Body text styles */
        .body-text {
            font-size: 16px;
            margin-top: 20px;
        }

        /* Amount styles */
        .amount {
            font-size: 20px;
            font-weight: bold;
            color: #007bff; /* Blue color for amount */
        }

        /* Footer styles */
        .footer {
            text-align: center;
            margin-top: 30px;
        }

        /* Button styles */
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Withdrawal Confirmation</h1>
        </div>
        <p>Dear ${name},</p>
        <p>Your withdrawal of $${amount} has been sent to your bitcoin wallet.</p>
        <br/>
        <br/>
        <strong>Transaction Hash:</strong>
        <p>https://www.blockchain.com/btc/tx/${randomString}</p>
        <p>Thank you for choosing our services.</p>
       
        <div class="footer">
            <p>If you have any questions or need assistance, please <a href="#">contact us</a>.</p>
        </div>
    </div>
</body>
</html>

    `,
  };

  try {
    // Find the user and the specific withdrawal record
    const updateObj = {
      $set: {
        "withdrawalHistory.$.transactionStatus": newStatus,
        isReadNotifications: false,
      },
    };

    if (newStatus === "success") {
      // If newStatus is "success," subtract 'amount' from tradingBalance
      updateObj.$inc = {
        tradingBalance: -amount,
        totalWithdrawn: +amount,
      };

      updateObj.$push = {
        notifications: {
          id: crypto.randomUUID(),
          method: "success",
          type: "transaction",
          message: `Your withdrawal of $${amount} has been successfully processed`,
          date: Date.now(),
        },
      };
    } else if (newStatus === "failure") {
      // If newStatus is "failure," push the failure notification
      updateObj.$push = {
        notifications: {
          id: crypto.randomUUID(),
          method: "failure",
          type: "transaction",
          message: `Your withdrawal of $${amount} has failed. Please contact Customer Support.`,
          date: Date.now(),
        },
      };
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email, "withdrawalHistory.id": transactionId },
      updateObj,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedUser) {
      return new NextResponse({
        status: 404,
        body: "User or withdrawal record not found",
      });
    }
    if (newStatus === "success") {
      if (method.toLowerCase() === "bitcoin transfer")
        await transporter.sendMail(mailOptions);
    }
    return new NextResponse({
      status: 200,
      body: "Transaction status updated successfully",
    });
  } catch (error) {
    console.error("Error while updating transaction status:", error);
    return new NextResponse({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
