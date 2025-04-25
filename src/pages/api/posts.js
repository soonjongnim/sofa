import { db } from "@vercel/postgres";

export default async function handler(req, res) {
  console.log("handler posts data..."); // 데이터 가져오기 시작 로그
  const client = await db.connect();
 
  try {
    await client.sql`CREATE TABLE IF NOT EXISTS Pets ( Name varchar(255), Owner varchar(255) );`;
    const names = ['Fiona', 'Lucy'];
    await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${names[0]}, ${names[1]});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const pets = await client.sql`SELECT * FROM Pets;`;
  return response.status(200).json({ pets: pets.rows });
  // if (req.method === "GET") {
  //   try {
  //     const { rows } = await sql`SELECT id, title, content, author FROM posts;`;
  //     console.log("Fetched posts data:", rows); // 데이터 확인
  //     res.status(200).json(rows);
  //   } catch (error) {
  //     res.status(500).json({ error: "Failed to fetch posts data" });
  //   }
  // } else {
  //   res.status(405).json({ error: "Method not allowed" });
  // }
}