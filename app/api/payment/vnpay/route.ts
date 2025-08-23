// src/app/api/payment/vnpay/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

const VNP_TMN_CODE = process.env.VNP_TMN_CODE || "DEMO";
const VNP_HASH_SECRET = process.env.VNP_HASH_SECRET || "SECRET";
const VNP_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const VNP_RETURN_URL = "http://localhost:3000/payment/success";

export async function POST(req: Request) {
    const body = await req.json();
    const { amount, orderId } = body;

    // mock params
    const vnp_Params: any = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: VNP_TMN_CODE,
        vnp_Amount: amount * 100, // nhân 100 theo quy định VNPAY
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Thanh toan don hang demo",
        vnp_OrderType: "other",
        vnp_Locale: "vn",
        vnp_ReturnUrl: VNP_RETURN_URL,
        vnp_IpAddr: "127.0.0.1",
        vnp_CreateDate: new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0,14),
    };

    // sort params
    const sorted = Object.keys(vnp_Params).sort();
    const signData = sorted.map(k => k + "=" + vnp_Params[k]).join("&");
    const hmac = crypto.createHmac("sha512", VNP_HASH_SECRET);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;

    const url =
        VNP_URL +
        "?" +
        sorted.map(k => k + "=" + encodeURIComponent(vnp_Params[k])).join("&") +
        "&vnp_SecureHash=" +
        signed;

    return NextResponse.json({ paymentUrl: url });
}
