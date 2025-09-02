import fetch from "node-fetch";

const res = await fetch("http://localhost:3001/api/test", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ hello: "world" }),
});

const data = await res.json();
console.log(data);
