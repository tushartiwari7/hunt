const fs = require("fs");
const xlsx = require("xlsx");
const nodemailer = require("nodemailer");
const posting = require("./posting.json");
const { exit } = require("process");
// download the above packages

// Load your Excel file
const workbook = xlsx.readFile("./referrals.xlsx"); // Path for the sheet in your local folder
const sheetName = "references"; // Change to the name of your sheet
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);
// Email configuration
const newTransporter = () => {
  return nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // user: "tushartiwari0172@gmail.com",
      // pass: "vaqa tngu trwp urai",
      user: 'tushar.frontend@gmail.com',
      pass: 'xwku txvj cijd xsam' 
    },
  });
};
const transporter = newTransporter();
const sendEmail = async (row) => {
  const { Name, Email } = row; // Adjust column names accordingly
  const {role, company, link} = posting;
  const nameParts = Name.split(" ");
  const name = nameParts[0];
  const mailOptions = {
    from: "Tushar Tiwari <tushar.frontend@gmail.com>",
    to: Email,
    subject: `Request for an Interview Opportunity - ${role} at ${company}`,
    html: `
<p>Greetings ${name},</p>
<p>I'm Tushar Tiwari, a Software Developer at Grid. I got to know through linkedin that <b>${company}</b> is looking for a <b>${role}</b> profile therefore, I have mailed you to tell you about myself. <br/> I have: 
<ul>
<li><b>close to 3 Years</b> of hands-on experience in <b>Frontend Domain</b></li>
<li>Worked extensively in <b>React, Node, Redux, Zustand, SCSS, TypeScript and IndexedDB.</b></li>
<li>Familiar with <b>REST, GraphQL, monorepo codebases, Jest & React Testing library</b></li>
<li>Worked in B2B Saas and Fintech startups having clients like Aditya Birla, Tata Steel, and EY.</li>
<li>Leading the revamp of a data-heavy Viewpage feature, achieving a <b>60% performance improvement using table virtualization and data caching</b>.</li>
<li>Implementing API Connectors with <b>OAuth authentication</b>, boosting feature utilization by 2x.</li>
<li>Bachelor's in Computer Science from  <b>PTU Chandigarh, 2022 Grad </b></li>
</ul>
<p>Beyond my professional role, I actively <b>contribute to the developer community</b> through blog posts that have engaged over <b>20,000 readers</b> and by building open-source projects like Elevate UI, a CSS component library.
<br/>
I'm actively seeking Senior Frontend opportunities where I can continue to make a meaningful impact. I'd love to discuss how my skills and experiences align with ${company}.
</p>
<p>You can view my portfolio <a href="https://tushar.vercel.app">tushar.vercel.app</a> and GitHub projects <a href="https://github.com/tushartiwari7">here</a>.</p>
<p>Currently, I am <b>serving notice period</b> and can <b>join within 15 days</b> of receiving an offer. A little help from your side can significantly help my career.</p>
<p>PS: I have attached my <b><a href="https://drive.google.com/file/d/1AQ2bZ_yUheXoKPHwcAgyQIZxWAO_NwMT/view?usp=sharing">Resume</a></b> & <b><a href="https://www.linkedin.com/in/tushartiwari7/">Linkedin Profile</a></b> ${
      link !== undefined ? `& <b><a href=${link}>Job Opening</a> </b>` : ""
    } for you to take a look at. If you find me suitable, please help me with an Interview Opportunity at ${company}.</p>
<p> 
<p>
Thanking You<br>
Regards,<br>
<b>Tushar Tiwari</b> <br>
<b>Contact No: +91 9855084891</b><br>
</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", Email);
  } catch (error) {
    console.error("Error sending email:", Email, error);
  }
};

const ONE_MINUTE = 90000; // 90000ms
const TEN_SEC = 10000; // 90000ms

const sendEmailsSynchronously = async () => {
  for (const row of data) {
    await sendEmail(row);
    await new Promise((resolve) => setTimeout(resolve, Math.random() * TEN_SEC)); // Pause for 1 minute (adjust the duration as needed)
  }
  console.log("Done Sending mails");
  exit();
};

// I hope you’re doing well! I noticed you’re working at Amazon now and wanted to reach out regarding the SDE position. I have 3+ years of experience with React, Node, Redux, Zustand, SCSS, TypeScript, and IndexedDB. I’ve worked in cross-functional teams, collaborating through the entire SDLC to deliver impactful, high-quality solutions, and I’m passionate about building scalable applications.

// Call the function to send emails
sendEmailsSynchronously();
