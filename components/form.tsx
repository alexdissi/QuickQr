"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function Form() {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const qrCodeImageRef = useRef(null);

  const generateQRCode = () => {
    if (inputValue === "") {
      throw new Error("Please enter a value");
    } else {
      setQrCodeUrl(
        "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
          inputValue
      );
      setTimeout(() => {
        setInputValue("");
      }, 100);
    }
  };

  const handleDownload = (
    qrCodeImageRef: React.RefObject<HTMLImageElement>
  ): void => {
    if (qrCodeImageRef.current) {
      const link = document.createElement("a");
      link.href = qrCodeImageRef.current.src;
      link.download = "qr-code.png";
      link.click();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    generateQRCode();
    setLoading(false);
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex items-center justify-center mt-5 gap-4"
      >
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className="w-82"
        />
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button disabled={inputValue === ""}>Generate QR Code</Button>
        )}
      </form>

      {qrCodeUrl === "" ? (
        ""
      ) : (
        <div id="qr-image" className="flex items-center justify-center mt-5">
          <Image
            src={qrCodeUrl}
            alt="qr-code"
            width={240}
            height={240}
            ref={qrCodeImageRef}
          />
        </div>
      )}

      {qrCodeUrl !== "" && (
        <div className="flex items-center justify-center mt-5">
          <Button onClick={() => handleDownload(qrCodeImageRef)}>
            Download QR Code
          </Button>
        </div>
      )}
    </>
  );
}
