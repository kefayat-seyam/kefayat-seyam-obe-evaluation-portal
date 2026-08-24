/* ==================================================================
   seed-data.js — the starting data the app loads on its very first run
   ------------------------------------------------------------------
   IMPORTANT: this file is only a STARTING POINT. On first run store.js
   copies everything here into localStorage; after that the app reads
   and writes localStorage only. Editing this file changes nothing
   until you press "Reset demo data" in the sidebar (or clear the
   browser's storage for this page).

   Courses + curriculum topics are NOT here — they are auto-generated
   from the real RUET ECE syllabus PDF in seed-courses.js.

   Anything marked PLACEHOLDER is invented sample data and is meant to
   be replaced by real records entered through the Admin module.
   ================================================================== */

window.OBE_SEED = {

  /* ---------------------------------------------------------------
     DEPARTMENT — one department per Admin (the Department Head).
     --------------------------------------------------------------- */
  department: {
    id: 'dept-ece',
    name: 'Electrical & Computer Engineering',
    shortName: 'ECE',
    university: 'Rajshahi University of Engineering & Technology',
    session: '2020-2021',
    syllabusEdition: 'First Edition, September 2023'
  },

  /* ---------------------------------------------------------------
     SEMESTERS — fixed 8-semester structure. The id is used as the
     Course.semester value, so "3-1" means 3rd year odd semester.
     --------------------------------------------------------------- */
  semesters: [
    { id: '1-1', label: '1st Year Odd',  year: 1, term: 'Odd'  },
    { id: '1-2', label: '1st Year Even', year: 1, term: 'Even' },
    { id: '2-1', label: '2nd Year Odd',  year: 2, term: 'Odd'  },
    { id: '2-2', label: '2nd Year Even', year: 2, term: 'Even' },
    { id: '3-1', label: '3rd Year Odd',  year: 3, term: 'Odd'  },
    { id: '3-2', label: '3rd Year Even', year: 3, term: 'Even' },
    { id: '4-1', label: '4th Year Odd',  year: 4, term: 'Odd'  },
    { id: '4-2', label: '4th Year Even', year: 4, term: 'Even' }
  ],

  /* ---------------------------------------------------------------
     SERIES — an admission batch. PLACEHOLDER: adjust to your real
     series when the Series/Semester screen is built (Visit 3).
     --------------------------------------------------------------- */
  series: [
    { id: 'srs-20', name: 'Series 20 (2020-21)', departmentId: 'dept-ece', startYear: 2020, currentSemester: '4-2' },
    { id: 'srs-21', name: 'Series 21 (2021-22)', departmentId: 'dept-ece', startYear: 2021, currentSemester: '3-2' },
    { id: 'srs-22', name: 'Series 22 (2022-23)', departmentId: 'dept-ece', startYear: 2022, currentSemester: '2-2' },
    { id: 'srs-23', name: 'Series 23 (2023-24)', departmentId: 'dept-ece', startYear: 2023, currentSemester: '1-2' }
  ],

  /* ---------------------------------------------------------------
     PROGRAM OUTCOMES (PO) — the 12 graduate attributes used by BAETE
     / Washington Accord accreditation. These are real, not
     placeholder, and belong to the department.
     --------------------------------------------------------------- */
  programOutcomes: [
    { code: 'PO1',  title: 'Engineering Knowledge',        description: 'Apply knowledge of mathematics, natural science, engineering fundamentals and an engineering specialisation to the solution of complex engineering problems.' },
    { code: 'PO2',  title: 'Problem Analysis',             description: 'Identify, formulate, research literature and analyse complex engineering problems, reaching substantiated conclusions using first principles of mathematics, natural sciences and engineering sciences.' },
    { code: 'PO3',  title: 'Design / Development of Solutions', description: 'Design solutions for complex engineering problems and design systems, components or processes that meet specified needs with appropriate consideration for public health and safety, cultural, societal and environmental considerations.' },
    { code: 'PO4',  title: 'Investigation',                description: 'Conduct investigations of complex problems using research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.' },
    { code: 'PO5',  title: 'Modern Tool Usage',            description: 'Create, select and apply appropriate techniques, resources and modern engineering and IT tools, including prediction and modelling, to complex engineering problems, with an understanding of the limitations.' },
    { code: 'PO6',  title: 'The Engineer and Society',     description: 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to professional engineering practice.' },
    { code: 'PO7',  title: 'Environment and Sustainability', description: 'Understand and evaluate the sustainability and impact of professional engineering work in the solution of complex engineering problems in societal and environmental contexts.' },
    { code: 'PO8',  title: 'Ethics',                       description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of engineering practice.' },
    { code: 'PO9',  title: 'Individual Work and Teamwork', description: 'Function effectively as an individual, and as a member or leader in diverse teams and in multidisciplinary settings.' },
    { code: 'PO10', title: 'Communication',                description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, including writing effective reports and design documentation and giving and receiving clear instructions.' },
    { code: 'PO11', title: 'Project Management and Finance', description: 'Demonstrate knowledge and understanding of engineering management principles and economic decision-making and apply these to one’s own work as a member or leader in a team and to manage projects in multidisciplinary environments.' },
    { code: 'PO12', title: 'Life-long Learning',           description: 'Recognise the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' }
  ],

  /* ---------------------------------------------------------------
     USERS — PLACEHOLDER people, so the three logins can be demoed.
     Passwords are stored in plain text on purpose: this project has
     no backend, so there is nothing real to protect. Replace this
     list from the Faculty Info / Students Info screens (Visit 3).

     role: 'admin' | 'faculty' | 'student'
     --------------------------------------------------------------- */
  users: [
    /* --- Admin = Department Head (one per department) --- */
    {
      id: 'u-admin', role: 'admin', departmentId: 'dept-ece',
      name: 'Dr. A. K. M. Rahman', email: 'head.ece@ruet.ac.bd', password: 'admin123',
      designation: 'Professor & Head of the Department'
    },

    /* --- Faculty --- */
    {
      id: 'u-fac-1', role: 'faculty', departmentId: 'dept-ece',
      name: 'Dr. Nusrat Jahan', email: 'nusrat@ruet.ac.bd', password: 'faculty123',
      designation: 'Associate Professor',
      courseCodes: ['ECE 1103', 'ECE 1104', 'ECE 3117']
    },
    {
      id: 'u-fac-2', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Rakibul Hasan', email: 'rakibul@ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 1101', 'ECE 1102', 'ECE 2105']
    },
    {
      id: 'u-fac-3', role: 'faculty', departmentId: 'dept-ece',
      name: 'Sabrina Islam', email: 'sabrina@ruet.ac.bd', password: 'faculty123',
      designation: 'Lecturer',
      courseCodes: ['ECE 3111', 'ECE 3112']
    },
    {
      id: 'u-fac-4', role: 'faculty', departmentId: 'dept-ece',
      name: 'Dr. Tanvir Ahmed', email: 'tanvir@ruet.ac.bd', password: 'faculty123',
      designation: 'Professor',
      courseCodes: ['ECE 4127', 'ECE 4128', 'ECE 3205']
    },
    {
      id: 'u-fac-5', role: 'faculty', departmentId: 'dept-ece',
      name: 'Farhana Akter', email: 'farhana@ruet.ac.bd', password: 'faculty123',
      designation: 'Lecturer',
      courseCodes: ['ECE 2215', 'ECE 2216']
    },

    /* --- Students (read-only role). A student is enrolled in every
           non-optional course of their current semester. --- */
    {
      id: 'u-stu-1', role: 'student', departmentId: 'dept-ece',
      name: 'Sadikin Hossain', email: 'sadikin@student.ruet.ac.bd', password: 'student123',
      roll: '2010001', seriesId: 'srs-20', semester: '4-2', section: 'A'
    },
    {
      id: 'u-stu-2', role: 'student', departmentId: 'dept-ece',
      name: 'Ayesha Siddika', email: 'ayesha@student.ruet.ac.bd', password: 'student123',
      roll: '2110014', seriesId: 'srs-21', semester: '3-2', section: 'A'
    },
    {
      id: 'u-stu-3', role: 'student', departmentId: 'dept-ece',
      name: 'Imran Kabir', email: 'imran@student.ruet.ac.bd', password: 'student123',
      roll: '2210032', seriesId: 'srs-22', semester: '2-2', section: 'B'
    },
    {
      id: 'u-stu-4', role: 'student', departmentId: 'dept-ece',
      name: 'Maliha Noor', email: 'maliha@student.ruet.ac.bd', password: 'student123',
      roll: '2310007', seriesId: 'srs-23', semester: '1-2', section: 'A'
    }
  ],

  /* ---------------------------------------------------------------
     COURSE OUTCOMES (CO) — PLACEHOLDER wording, written only for the
     courses the demo faculty teach, so the CO/PO screens have
     something to show. Admin adds the rest from the CO/PO Framework.

     Keyed by course code; the CO code (CO1, CO2 ...) is added
     automatically in the order listed.
     --------------------------------------------------------------- */
  courseOutcomes: {
    'ECE 1101': [
      'Explain the behaviour of DC and sinusoidal AC circuits in terms of voltage, current, power and energy.',
      'Apply Kirchhoff’s laws and network theorems to solve series-parallel resistive and reactive networks.',
      'Analyse the frequency response and resonance of AC circuits using appropriate simulation tools.',
      'Solve series, parallel and series-parallel magnetic circuits using the concepts of flux and reluctance.'
    ],
    'ECE 1102': [
      'Build and measure DC and AC circuits safely on a laboratory bench.',
      'Verify network theorems experimentally and compare results with hand calculations.',
      'Report laboratory findings clearly, including sources of measurement error.'
    ],
    'ECE 1103': [
      'Describe the role of a compiler, an interpreter and a flow chart in solving a computational problem.',
      'Write, debug and run C programs that use conditionals, loops, functions and arrays.',
      'Use pointers, strings, structures and files to handle non-trivial data in C.',
      'Decompose a given real-world problem into a working, readable C program.'
    ],
    'ECE 1104': [
      'Implement, compile and test C programs for given problem statements in the laboratory.',
      'Trace and correct logical and runtime errors in an existing program.',
      'Document a program’s input, output and limitations in a laboratory report.'
    ],
    'ECE 2105': [
      'Explain the operating principles of digital logic families and their electrical characteristics.',
      'Design combinational logic circuits from a specification using minimisation techniques.',
      'Design sequential circuits such as counters and registers using flip-flops.'
    ],
    'ECE 2215': [
      'Explain the architecture of a database management system and the role of transaction management.',
      'Design a normalised relational schema from a set of user requirements using ER modelling.',
      'Write SQL queries to create, populate and interrogate a relational database.',
      'Evaluate concurrency, recovery and security issues in a multi-user database.'
    ],
    'ECE 2216': [
      'Implement a normalised database schema in a modern DBMS.',
      'Write and optimise SQL queries for a given information need.',
      'Develop a small database-backed application and demonstrate it.'
    ],
    'ECE 3111': [
      'Describe the internal architecture and addressing modes of a modern microprocessor.',
      'Write assembly language routines that use registers, memory and the stack correctly.',
      'Design interfacing circuits between a microprocessor and peripheral devices.',
      'Select a suitable interrupt or polling strategy for a given interfacing problem.'
    ],
    'ECE 3112': [
      'Assemble, run and debug assembly language programs on a development board.',
      'Interface input and output devices with a microprocessor and verify the timing.',
      'Present an interfacing project, explaining design choices and limitations.'
    ],
    'ECE 3117': [
      'Compare software process models and select one appropriate to a given project.',
      'Elicit and specify software requirements for an information system.',
      'Produce design documentation using standard modelling notation.',
      'Plan testing, estimation and quality activities for a small software project.'
    ],
    'ECE 3205': [
      'Explain the principles of analog and digital communication systems.',
      'Analyse the effect of noise on the performance of a communication link.',
      'Compute bandwidth and power requirements for a given modulation scheme.'
    ],
    'ECE 4127': [
      'Explain MOS technology and the top-down VLSI design methodology.',
      'Derive the DC and transient characteristics of NMOS, CMOS and Bi-CMOS inverters.',
      'Draw stick diagrams and layouts that obey the given design rules.',
      'Evaluate a VLSI subsystem for area, power and testability.'
    ],
    'ECE 4128': [
      'Use an EDA tool flow to capture, simulate and verify a CMOS circuit.',
      'Produce a design-rule-clean layout for a small digital block.',
      'Document a VLSI design project including verification results.'
    ]
  },

  /* ---------------------------------------------------------------
     CO-PO MAPPING — PLACEHOLDER starter mappings so the Faculty
     CO-PO screen (Visit 2, Step 2) is not empty. Faculty edit these.

     Format: 'COURSE CODE': { 'CO1': { PO1: 3, PO2: 2 }, ... }
     Correlation level: 1 = low, 2 = medium, 3 = high.
     --------------------------------------------------------------- */
  coPoMappings: {
    'ECE 1103': {
      CO1: { PO1: 2, PO12: 1 },
      CO2: { PO1: 3, PO5: 2 },
      CO3: { PO1: 3, PO2: 2, PO5: 2 },
      CO4: { PO2: 3, PO3: 2, PO5: 1 }
    },
    'ECE 1101': {
      CO1: { PO1: 3 },
      CO2: { PO1: 3, PO2: 3 },
      CO3: { PO2: 2, PO5: 3 },
      CO4: { PO1: 2, PO2: 2 }
    },
    'ECE 3117': {
      CO1: { PO1: 2, PO11: 2 },
      CO2: { PO2: 3, PO6: 1, PO10: 2 },
      CO3: { PO3: 3, PO5: 2, PO10: 2 },
      CO4: { PO4: 2, PO9: 2, PO11: 3 }
    }
  },

  /* ---------------------------------------------------------------
     NOTICES — PLACEHOLDER. level is 'department' | 'semester' | 'course'.
     Only the id matching the level is used (semester / courseCode).
     --------------------------------------------------------------- */
  notices: [
    {
      title: 'Class routine for 2026-27 odd semester published',
      message: 'The class routine for the odd semester has been published on the department notice board and the department website. Students should collect their section-wise routine from the respective class representative.',
      level: 'department', date: '2026-08-18', author: 'Head of the Department'
    },
    {
      title: 'OBE curriculum review meeting',
      message: 'A curriculum review meeting with all course teachers will be held in the department conference room to finalise course outcomes and CO-PO mapping for the running semester.',
      level: 'department', date: '2026-08-12', author: 'Head of the Department'
    },
    {
      title: 'Form fill-up for 4th year even semester final examination',
      message: 'Form fill-up for the final examination will remain open for two weeks. Late fill-up will attract an additional fee as per university rules.',
      level: 'semester', semester: '4-2', date: '2026-08-16', author: 'Exam Committee'
    },
    {
      title: '3rd year even semester CT schedule',
      message: 'Class test schedule for all theory courses of this semester has been finalised. Each course will hold three class tests; the best two will be counted.',
      level: 'semester', semester: '3-2', date: '2026-08-10', author: 'Semester Coordinator'
    },
    {
      title: 'ECE 1103: extra problem-solving class',
      message: 'An extra problem-solving class on pointers and file handling will be held this Saturday. Attendance is optional but strongly recommended before the second class test.',
      level: 'course', courseCode: 'ECE 1103', date: '2026-08-20', author: 'Dr. Nusrat Jahan'
    },
    {
      title: 'ECE 3111: assignment on interfacing submission date',
      message: 'The assignment on 8086 peripheral interfacing must be submitted as a hard copy in the next class. Late submission will lose 20% of the marks.',
      level: 'course', courseCode: 'ECE 3111', date: '2026-08-19', author: 'Sabrina Islam'
    }
  ]
};
