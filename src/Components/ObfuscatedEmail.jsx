import { useEffect, useState } from "react";
import { decodeEmail } from "@/lib/obfuscateEmail";

export const ObfuscatedEmail = ({ encoded, className }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(decodeEmail(encoded));
  }, [encoded]);

  if (!email) {
    return (
      <span className={className} aria-hidden="true">
        Loading email…
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
};
