const express = require("express");

const db = require("./src/database/data");

const app = express();

app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

app.get("/books", async (req, res) => {
  try {
    const sql = "SELECT * FROM allbooks";
    const [data, error] = await db.query(sql);
    const html = `
  <ul>
    ${data
      .map(
        (value, index) =>
          `<li>bookname:${value.bookname}<br/>author:${value.author}<br/>about:${value.description}</li>`
      )
      .join("")}
  </ul>
`;
    res.send(html);
  } catch (error) {
    console.log(error);
    return res.send({ status: false, error });
  }
});

app.get("/books/:id", async (req, res) => {
  const id = Number(req.params.id);
  // const sentid=user.find((value)=>value.id===id)
  if (id <= 11) {
    try {
      const sqlquerry = `SELECT * FROM allbooks WHERE id = ${id};`;
      const [data, error] = await db.query(sqlquerry);
      //   console.log(data)

      const html = `
    <ul>
      ${data
        .map(
          (value, index) =>
            `<li>bookname:${value.bookname}<br/>author:${value.author}<br/>about:${value.description}</li>`
        )
        .join("")}
    </ul>
  `;
      return res.send(html);
    } catch (error) {
      console.log(error);
      return res.send({ status: false, error });
    }
  } else {
    const html = `<h1>THE BOOK YOU ARE SERCHING ID NOT AVAILABLE</h1>`;
    res.send(html);
  }
});

app.get("/books/new/upcoming", async (req, res) => {
  try {
    const sql = "SELECT * FROM upcoming";
    const [data, error] = await db.query(sql);
    const html = `
    <ul>
      ${data
        .map(
          (value, index) =>
            `<li>bookname:${value.bookname}<br/>author:${value.author}<br/>about:${value.description}</li>`
        )
        .join("")}
    </ul>
  `;
    return res.send(html);
  } catch (error) {
    console.log(error);
    return res.send({ status: false, error });
  }
});

app.post("/books", async (req, res) => {
  
  try {
    const body = req.body;
    const sql = `INSERT INTO allbooks (id, bookname, author,description)
    VALUES ("${body.id}","${body.bookname}","${body.author}","${body.description}");`;
    const [data, ] = await db.query(sql);

    const html = `
    <ul>
      ${data
        .map(
          (value) =>
            `<li>bookname:${value.bookname}<br/>author:${value.author}<br/>about:${value.description}</li>`
        )
        .join("")}
    </ul>
  `;
    return res.send(html)
  } catch (error) {
    console.log(error);
    return res.send({ status: false, error });
  }
});

app.listen(3000, () => {
  console.log("listening to port");
});

// exports.app=app;
