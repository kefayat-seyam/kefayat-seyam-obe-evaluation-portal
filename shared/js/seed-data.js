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
    { id: 'srs-23', name: 'Series 23 (2023-24)', departmentId: 'dept-ece', startYear: 2023, currentSemester: '1-2' },
    { id: 'srs-24', name: 'Series 24 (2024-25)', departmentId: 'dept-ece', startYear: 2024, currentSemester: '2-1' }
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
     USERS — the three logins the app is demoed with.

     The teachers are the REAL ECE faculty list from
     https://www.ece.ruet.ac.bd/teacher — names, designations and who is
     currently on leave. Their email addresses and passwords are NOT
     real: they are built from each teacher's profile name on that site
     purely so every account has something to sign in with. Replace them
     with real addresses if this is ever used for anything.

     The students are invented.

     Passwords are stored in plain text on purpose: this project has no
     backend, so there is nothing real to protect.

     role: 'admin' | 'faculty' | 'student'
     onLeave marks the teachers the department site shows as on leave;
     they hold no courses this session.
     --------------------------------------------------------------- */
  users: [
    /* --- Admin account = department administration (separate from teaching) --- */
    {
      id: 'u-admin', role: 'admin', departmentId: 'dept-ece',
      name: 'Department Administrator', email: 'head.ece@ruet.ac.bd', password: 'admin123',
      designation: 'Administrator'
    },

    /* --- Faculty: Assistant Professors --- */
    {
      id: 'u-fac-head', role: 'faculty', departmentId: 'dept-ece',
      name: 'Prof. Dr. Md. Anwar Hossain', email: 'anwarhossain@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Professor', courseCodes: ['ECE 1101', 'ECE 1102']
    },
    {
      id: 'u-fac-1', role: 'faculty', departmentId: 'dept-ece',
      name: 'Fariya Tabassum', email: 'fariya@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 1101', 'ECE 1102']
    },
    {
      id: 'u-fac-2', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Abu Hanif Pramanik', email: 'abuhanif@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 1103', 'ECE 1104']
    },
    {
      id: 'u-fac-3', role: 'faculty', departmentId: 'dept-ece',
      name: 'Hafsa Binte Kibria', email: 'hafsa@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 2215', 'ECE 2216', 'ECE 2103', 'ECE 2104']
    },
    {
      id: 'u-fac-4', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Omaer Faruq Goni', email: 'omaerfaruq@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 3117', 'ECE 3118']
    },
    {
      id: 'u-fac-5', role: 'faculty', departmentId: 'dept-ece',
      name: 'Oishi Jyoti', email: 'oishi@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 3111', 'ECE 3112', 'ECE 2111', 'ECE 2112']
    },
    {
      id: 'u-fac-6', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Faysal Ahamed', email: 'faysal@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 4127', 'ECE 4128']
    },
    {
      id: 'u-fac-7', role: 'faculty', departmentId: 'dept-ece',
      name: 'Moloy Kumar Ghosh', email: 'moloy@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['ECE 3205', 'ECE 3206']
    },
    {
      id: 'u-fac-8', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Habibur Rahaman', email: 'habib@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-9', role: 'faculty', departmentId: 'dept-ece',
      name: 'Tasnim Binte Shawkat', email: 'tasnim@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-10', role: 'faculty', departmentId: 'dept-ece',
      name: 'Abdul Matin', email: 'abdulmatin@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-11', role: 'faculty', departmentId: 'dept-ece',
      name: 'Sagor Chandro Bakchy', email: 'sagorchandro@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-12', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Mahabubur Rahman', email: 'mahabubur@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-13', role: 'faculty', departmentId: 'dept-ece',
      name: 'Milton Kumar Kundu', email: 'milton@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-14', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Robiul Islam', email: 'robiul@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-15', role: 'faculty', departmentId: 'dept-ece',
      name: 'Rakibul Hassan', email: 'rakibulhassan@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },
    {
      id: 'u-fac-16', role: 'faculty', departmentId: 'dept-ece',
      name: 'Md. Nahiduzzaman', email: 'nahiduzzaman@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor', onLeave: true
    },

    /* --- Faculty: Lecturers --- */
    {
      id: 'u-fac-17', role: 'faculty', departmentId: 'dept-ece',
      name: 'Nadim Reza', email: 'nadim@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Lecturer',
      courseCodes: ['ECE 2105', 'ECE 2106', 'ECE 1101']
    },
    {
      id: 'u-fac-18', role: 'faculty', departmentId: 'dept-ece',
      name: 'Mst. Mazeda Noor Tasnim', email: 'mazeda@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Lecturer',
      courseCodes: ['ECE 1100']
    },
    {
      id: 'u-fac-19', role: 'faculty', departmentId: 'dept-ece',
      name: 'Mst. Nafia Islam Shishir', email: 'nafia@ece.ruet.ac.bd', password: 'faculty123',
      designation: 'Lecturer',
      courseCodes: ['ECE 2100']
    },

    /* --- Non-departmental (external) teachers ---
       First-year students take Mathematics, Physics and Humanities courses
       that belong to OTHER departments. Those teachers are not ECE staff,
       so they are flagged `external: true` and carry the name of their own
       department. The admin manages them on a separate screen, but they log
       in and teach exactly like any other faculty member.

       Note ECE 1101 below: it is deliberately shared between two teachers
       (Fariya Tabassum and Nadim Reza) to show that one course can now have
       several teachers at once. --- */
    {
      id: 'u-ext-1', role: 'faculty', departmentId: 'dept-ece',
      external: true, externalDepartment: 'Mathematics',
      name: 'Dr. Sharmin Akter', email: 'sharmin@math.ruet.ac.bd', password: 'faculty123',
      designation: 'Professor',
      courseCodes: ['Math 1117', 'Math 1217', 'Math 2117']
    },
    {
      id: 'u-ext-2', role: 'faculty', departmentId: 'dept-ece',
      external: true, externalDepartment: 'Physics',
      name: 'Dr. Kamrul Hasan', email: 'kamrul@phy.ruet.ac.bd', password: 'faculty123',
      designation: 'Associate Professor',
      courseCodes: ['Phy 1117', 'Phy 1118']
    },
    {
      id: 'u-ext-3', role: 'faculty', departmentId: 'dept-ece',
      external: true, externalDepartment: 'Humanities',
      name: 'Rahima Khatun', email: 'rahima@hum.ruet.ac.bd', password: 'faculty123',
      designation: 'Assistant Professor',
      courseCodes: ['Hum 1117', 'Hum 1118', 'Hum 1217']
    },
    {
      id: 'u-ext-4', role: 'faculty', departmentId: 'dept-ece',
      external: true, externalDepartment: 'Chemistry',
      name: 'Dr. Nasrin Sultana', email: 'nasrin@chem.ruet.ac.bd', password: 'faculty123',
      designation: 'Professor',
      courseCodes: ['Chem 2117', 'Chem 2118']
    },

    /* --- Students (read-only role) — the REAL Series 24 roster.
           Names and roll numbers come from the department's UGRM sheet for
           the 2024-25 intake, now in 2nd Year Odd (2-1). Every student is
           enrolled in the non-optional courses of their current semester.

           u-stu-N lines up with roll 24100NN, which makes the marks loop at
           the bottom of this file easy to follow.

           Four rolls (2410008, 2410034, 2410038, 2410041) were issued but the
           sheet has no name against them. They are seeded with a blank name on
           purpose: the app then shows them as "Waiting for student" until the
           student fills in their own profile. --- */
    {
      id: 'u-stu-1', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Ahnaf Azmain', email: '2410001@student.ruet.ac.bd', password: 'student123',
      roll: '2410001', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-2', role: 'student', departmentId: 'dept-ece',
      name: 'Smriti Rani', email: '2410002@student.ruet.ac.bd', password: 'student123',
      roll: '2410002', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-3', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Fahad Hossain Tareq', email: '2410003@student.ruet.ac.bd', password: 'student123',
      roll: '2410003', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-4', role: 'student', departmentId: 'dept-ece',
      name: 'Kefayat Simum', email: '2410004@student.ruet.ac.bd', password: 'student123',
      roll: '2410004', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-5', role: 'student', departmentId: 'dept-ece',
      name: 'Nazmul Islam Nice', email: '2410005@student.ruet.ac.bd', password: 'student123',
      roll: '2410005', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-6', role: 'student', departmentId: 'dept-ece',
      name: 'Sadidur Rahman Shabib', email: '2410006@student.ruet.ac.bd', password: 'student123',
      roll: '2410006', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-7', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Sadikin Naser Araf', email: '2410007@student.ruet.ac.bd', password: 'student123',
      roll: '2410007', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-8', role: 'student', departmentId: 'dept-ece',
      name: '', email: '2410008@student.ruet.ac.bd', password: 'student123',
      roll: '2410008', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-9', role: 'student', departmentId: 'dept-ece',
      name: 'Piarul Islam Shefat', email: '2410009@student.ruet.ac.bd', password: 'student123',
      roll: '2410009', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-10', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Rakibul Islam', email: '2410010@student.ruet.ac.bd', password: 'student123',
      roll: '2410010', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-11', role: 'student', departmentId: 'dept-ece',
      name: 'Tasnim Masud', email: '2410011@student.ruet.ac.bd', password: 'student123',
      roll: '2410011', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-12', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Ahnaf Kabir Sami', email: '2410012@student.ruet.ac.bd', password: 'student123',
      roll: '2410012', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-13', role: 'student', departmentId: 'dept-ece',
      name: 'Sharmista Saha', email: '2410013@student.ruet.ac.bd', password: 'student123',
      roll: '2410013', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-14', role: 'student', departmentId: 'dept-ece',
      name: 'Tanzimul Ittahad', email: '2410014@student.ruet.ac.bd', password: 'student123',
      roll: '2410014', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-15', role: 'student', departmentId: 'dept-ece',
      name: 'Mehedi Rahman Mahi', email: '2410015@student.ruet.ac.bd', password: 'student123',
      roll: '2410015', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-16', role: 'student', departmentId: 'dept-ece',
      name: 'Afia Samin', email: '2410016@student.ruet.ac.bd', password: 'student123',
      roll: '2410016', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-17', role: 'student', departmentId: 'dept-ece',
      name: 'Asrafun Naher Sarah', email: '2410017@student.ruet.ac.bd', password: 'student123',
      roll: '2410017', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-18', role: 'student', departmentId: 'dept-ece',
      name: 'Abdullah', email: '2410018@student.ruet.ac.bd', password: 'student123',
      roll: '2410018', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-19', role: 'student', departmentId: 'dept-ece',
      name: 'Uddipon Chowdhury', email: '2410019@student.ruet.ac.bd', password: 'student123',
      roll: '2410019', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-20', role: 'student', departmentId: 'dept-ece',
      name: 'Zubaer Ahmed Siam', email: '2410020@student.ruet.ac.bd', password: 'student123',
      roll: '2410020', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-21', role: 'student', departmentId: 'dept-ece',
      name: 'Mahmud Mashrafee', email: '2410021@student.ruet.ac.bd', password: 'student123',
      roll: '2410021', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-22', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Amimul Ihsan', email: '2410022@student.ruet.ac.bd', password: 'student123',
      roll: '2410022', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-23', role: 'student', departmentId: 'dept-ece',
      name: 'Redwanul Huq Tamim', email: '2410023@student.ruet.ac.bd', password: 'student123',
      roll: '2410023', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-24', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Farhan Ishraq', email: '2410024@student.ruet.ac.bd', password: 'student123',
      roll: '2410024', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-25', role: 'student', departmentId: 'dept-ece',
      name: 'Khaja Shakib Shadman Shihab', email: '2410025@student.ruet.ac.bd', password: 'student123',
      roll: '2410025', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-26', role: 'student', departmentId: 'dept-ece',
      name: 'Naimur Rahman Niloy', email: '2410026@student.ruet.ac.bd', password: 'student123',
      roll: '2410026', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-27', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Saimur Rahman Seum', email: '2410027@student.ruet.ac.bd', password: 'student123',
      roll: '2410027', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-28', role: 'student', departmentId: 'dept-ece',
      name: 'Oleen Deb Das', email: '2410028@student.ruet.ac.bd', password: 'student123',
      roll: '2410028', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-29', role: 'student', departmentId: 'dept-ece',
      name: 'Rafin Mahfuz', email: '2410029@student.ruet.ac.bd', password: 'student123',
      roll: '2410029', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-30', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Miftahul Islam Tamjid', email: '2410030@student.ruet.ac.bd', password: 'student123',
      roll: '2410030', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-31', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Al Khalik', email: '2410031@student.ruet.ac.bd', password: 'student123',
      roll: '2410031', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-32', role: 'student', departmentId: 'dept-ece',
      name: 'Sajeeb Roy', email: '2410032@student.ruet.ac.bd', password: 'student123',
      roll: '2410032', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-33', role: 'student', departmentId: 'dept-ece',
      name: 'Fahmida Faiza Snigdho', email: '2410033@student.ruet.ac.bd', password: 'student123',
      roll: '2410033', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-34', role: 'student', departmentId: 'dept-ece',
      name: '', email: '2410034@student.ruet.ac.bd', password: 'student123',
      roll: '2410034', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-35', role: 'student', departmentId: 'dept-ece',
      name: 'Nabil Ahmed Arnob', email: '2410035@student.ruet.ac.bd', password: 'student123',
      roll: '2410035', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-36', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Saffat Al Sifat Rafiu', email: '2410036@student.ruet.ac.bd', password: 'student123',
      roll: '2410036', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-37', role: 'student', departmentId: 'dept-ece',
      name: 'Showmee Ahmed', email: '2410037@student.ruet.ac.bd', password: 'student123',
      roll: '2410037', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-38', role: 'student', departmentId: 'dept-ece',
      name: '', email: '2410038@student.ruet.ac.bd', password: 'student123',
      roll: '2410038', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-39', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Jahidul Islam Nafij', email: '2410039@student.ruet.ac.bd', password: 'student123',
      roll: '2410039', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-40', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Naeemur Rahman Naeem', email: '2410040@student.ruet.ac.bd', password: 'student123',
      roll: '2410040', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-41', role: 'student', departmentId: 'dept-ece',
      name: '', email: '2410041@student.ruet.ac.bd', password: 'student123',
      roll: '2410041', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-42', role: 'student', departmentId: 'dept-ece',
      name: 'Nafisa Islam', email: '2410042@student.ruet.ac.bd', password: 'student123',
      roll: '2410042', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-43', role: 'student', departmentId: 'dept-ece',
      name: 'Auyon Dip Sardar', email: '2410043@student.ruet.ac.bd', password: 'student123',
      roll: '2410043', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-44', role: 'student', departmentId: 'dept-ece',
      name: 'Nishit Ray', email: '2410044@student.ruet.ac.bd', password: 'student123',
      roll: '2410044', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-45', role: 'student', departmentId: 'dept-ece',
      name: 'Ahsan Ullah', email: '2410045@student.ruet.ac.bd', password: 'student123',
      roll: '2410045', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-46', role: 'student', departmentId: 'dept-ece',
      name: 'Nujhat Binta Kabir Nahira', email: '2410046@student.ruet.ac.bd', password: 'student123',
      roll: '2410046', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-47', role: 'student', departmentId: 'dept-ece',
      name: 'Tousif Ahamed', email: '2410047@student.ruet.ac.bd', password: 'student123',
      roll: '2410047', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-48', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Tahsin Anzum', email: '2410048@student.ruet.ac.bd', password: 'student123',
      roll: '2410048', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-49', role: 'student', departmentId: 'dept-ece',
      name: 'Preetom Kumar Chakrabartty', email: '2410049@student.ruet.ac.bd', password: 'student123',
      roll: '2410049', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-50', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Ahnaf Abrar Alvi', email: '2410050@student.ruet.ac.bd', password: 'student123',
      roll: '2410050', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-51', role: 'student', departmentId: 'dept-ece',
      name: 'Tanbir Rana Sweet', email: '2410051@student.ruet.ac.bd', password: 'student123',
      roll: '2410051', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-52', role: 'student', departmentId: 'dept-ece',
      name: 'Mst. Jannatul Maowa Srabony', email: '2410052@student.ruet.ac.bd', password: 'student123',
      roll: '2410052', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-53', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Sheikh Shahrear Rahat', email: '2410053@student.ruet.ac.bd', password: 'student123',
      roll: '2410053', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-54', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Shahin Miah', email: '2410054@student.ruet.ac.bd', password: 'student123',
      roll: '2410054', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-55', role: 'student', departmentId: 'dept-ece',
      name: 'Naimul Hoque Siddiquee', email: '2410055@student.ruet.ac.bd', password: 'student123',
      roll: '2410055', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-56', role: 'student', departmentId: 'dept-ece',
      name: 'Ashikin Sultan', email: '2410056@student.ruet.ac.bd', password: 'student123',
      roll: '2410056', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-57', role: 'student', departmentId: 'dept-ece',
      name: 'Pronob Kumar Sutrodhar', email: '2410057@student.ruet.ac.bd', password: 'student123',
      roll: '2410057', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-58', role: 'student', departmentId: 'dept-ece',
      name: 'Md. Musfik Al Rahin Roktim', email: '2410058@student.ruet.ac.bd', password: 'student123',
      roll: '2410058', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-59', role: 'student', departmentId: 'dept-ece',
      name: 'Shibajit Das', email: '2410059@student.ruet.ac.bd', password: 'student123',
      roll: '2410059', seriesId: 'srs-24', semester: '2-1', section: 'A'
    },
    {
      id: 'u-stu-60', role: 'student', departmentId: 'dept-ece',
      name: 'Mamata Farzana Joyita', email: '2410060@student.ruet.ac.bd', password: 'student123',
      roll: '2410060', seriesId: 'srs-24', semester: '2-1', section: 'A'
    }
  ],

  /* ---------------------------------------------------------------
     COURSE OUTCOMES (CO) — PLACEHOLDER wording, written only for the
     courses the demo faculty teach, so the CO/PO screens have
     something to show. Admin adds the rest from the CO/PO Framework.

     Keyed by course code; the CO code (CO1, CO2 ...) is added
     automatically in the order listed.

     A CO can be written in two ways. The short way is a plain sentence,
     which becomes the description and leaves the title blank. The long
     way is { title, description }, which also gives the CO a short name
     to show in tables. Faculty can edit either field later from their
     Course Outcomes page, so both forms are equally valid here.
     --------------------------------------------------------------- */
  courseOutcomes: {
    'ECE 1101': [
      {
        title: 'DC & AC circuit behaviour',
        description: 'Explain the behaviour of DC and sinusoidal AC circuits in terms of voltage, current, power and energy.'
      },
      {
        title: 'Network theorems',
        description: 'Apply Kirchhoff’s laws and network theorems to solve series-parallel resistive and reactive networks.'
      },
      {
        title: 'Frequency response & resonance',
        description: 'Analyse the frequency response and resonance of AC circuits using appropriate simulation tools.'
      },
      {
        title: 'Magnetic circuits',
        description: 'Solve series, parallel and series-parallel magnetic circuits using the concepts of flux and reluctance.'
      }
    ],
    'ECE 1102': [
      'Build and measure DC and AC circuits safely on a laboratory bench.',
      'Verify network theorems experimentally and compare results with hand calculations.',
      'Report laboratory findings clearly, including sources of measurement error.'
    ],
    'ECE 1103': [
      {
        title: 'Problem solving tools',
        description: 'Describe the role of a compiler, an interpreter and a flow chart in solving a computational problem.'
      },
      {
        title: 'Core C programming',
        description: 'Write, debug and run C programs that use conditionals, loops, functions and arrays.'
      },
      {
        title: 'Pointers, structures & files',
        description: 'Use pointers, strings, structures and files to handle non-trivial data in C.'
      },
      {
        title: 'Real-world program design',
        description: 'Decompose a given real-world problem into a working, readable C program.'
      }
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
      level: 'course', courseCode: 'ECE 1103', date: '2026-08-20', author: 'Md. Abu Hanif Pramanik'
    },
    {
      title: 'ECE 3111: assignment on interfacing submission date',
      message: 'The assignment on 8086 peripheral interfacing must be submitted as a hard copy in the next class. Late submission will lose 20% of the marks.',
      level: 'course', courseCode: 'ECE 3111', date: '2026-08-19', author: 'Oishi Jyoti'
    }
  ],

  /* ---------------------------------------------------------------
     ASSIGNMENTS (Visit 3) — PLACEHOLDER. Faculty post assignments per
     course; students read them. Keyed here by course code, resolved to
     a courseId in store.js. Model: { id, courseId, title, description, dueDate }.
     --------------------------------------------------------------- */
  assignments: [
    {
      courseCode: 'ECE 1101', title: 'Assignment 1 — Nodal & Mesh Analysis',
      description: 'Solve problems 2.14–2.31 from Boylestad. Show every step and box the final answer. Submit hand-written on A4.',
      dueDate: '2026-09-10'
    },
    {
      courseCode: 'ECE 1101', title: 'Assignment 2 — AC Steady State',
      description: 'Phasor analysis of the four RLC networks handed out in class. Include the frequency-response sketch for each.',
      dueDate: '2026-09-24'
    },
    {
      courseCode: 'ECE 1103', title: 'Assignment 1 — Loops & Functions',
      description: 'Write, test and submit the six C programs from the problem sheet. One .c file per problem, all in a single zip.',
      dueDate: '2026-09-12'
    },
    {
      courseCode: 'ECE 1103', title: 'Assignment 2 — Pointers & Files',
      description: 'Implement the mini phone-book that reads and writes records to a text file using pointers and structures.',
      dueDate: '2026-09-26'
    }
  ],

  /* ---------------------------------------------------------------
     MARKS + ATTENDANCE (Visit 3) — PLACEHOLDER, generated just below
     for the active 1-1 batch so the Faculty entry screens and the
     Student view screens are not empty on first run. Real data is
     entered through the Faculty module.

     Models (resolved to courseId in store.js):
       CTMark      { id, studentId, courseId, testNumber, marks }  marks out of 20
                   testNumber 1..4; the best 3 count towards the total
       AssessMark  { id, studentId, courseId, marks }              marks out of 10
                   one per student/course: assignment + quiz + presentation
       FinalMark   { id, studentId, courseId, marks }              marks out of 60
       Attendance  { id, studentId, courseId, date, status }       present|absent|late
     --------------------------------------------------------------- */
  ctMarks: [],
  assessMarks: [],
  finalMarks: [],
  attendance: [],

  /* ---------------------------------------------------------------
     QUESTION PAPERS (Visit 4) — the spreadsheet-style, question-wise
     way of entering marks. A paper is one of:
       'ct1'..'ct4'  four class tests, 20 marks each
       'finalA'      semester final Part A, 30 marks
       'finalB'      semester final Part B, 30 marks

     Every question carries its own CO/PO tags, and a question worth 5
     marks can split those marks over more than one CO/PO pair — that is
     what `tags` is for. The marks inside `tags` must add up to the
     question's `maxMarks`.

     Question  { courseCode, paper, qNo, maxMarks, tags: [ ... ] }
     Tag       { coCode, poCode, marks }

     Only ECE 1101 gets question papers here. ECE 1103 is left without
     them on purpose, so the demo also shows the simpler fallback: when
     a course has no questions for a paper, the app keeps using the plain
     one-box CT / final mark above.
     --------------------------------------------------------------- */
  questions: [
    /* --- Class Test 1: four questions of 5 marks --- */
    { courseCode: 'ECE 1101', paper: 'ct1', qNo: 1, maxMarks: 5, tags: [{ coCode: 'CO1', poCode: 'PO1', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct1', qNo: 2, maxMarks: 5, tags: [{ coCode: 'CO2', poCode: 'PO1', marks: 5 }] },
    // A question that carries TWO outcomes: 3 marks to CO2/PO2, 2 to CO3/PO5.
    { courseCode: 'ECE 1101', paper: 'ct1', qNo: 3, maxMarks: 5, tags: [{ coCode: 'CO2', poCode: 'PO2', marks: 3 }, { coCode: 'CO3', poCode: 'PO5', marks: 2 }] },
    { courseCode: 'ECE 1101', paper: 'ct1', qNo: 4, maxMarks: 5, tags: [{ coCode: 'CO4', poCode: 'PO2', marks: 5 }] },

    /* --- Class Test 2 --- */
    { courseCode: 'ECE 1101', paper: 'ct2', qNo: 1, maxMarks: 5, tags: [{ coCode: 'CO2', poCode: 'PO1', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct2', qNo: 2, maxMarks: 5, tags: [{ coCode: 'CO2', poCode: 'PO2', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct2', qNo: 3, maxMarks: 5, tags: [{ coCode: 'CO3', poCode: 'PO5', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct2', qNo: 4, maxMarks: 5, tags: [{ coCode: 'CO1', poCode: 'PO1', marks: 2 }, { coCode: 'CO4', poCode: 'PO1', marks: 3 }] },

    /* --- Class Test 3 --- */
    { courseCode: 'ECE 1101', paper: 'ct3', qNo: 1, maxMarks: 5, tags: [{ coCode: 'CO3', poCode: 'PO2', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct3', qNo: 2, maxMarks: 5, tags: [{ coCode: 'CO3', poCode: 'PO5', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct3', qNo: 3, maxMarks: 5, tags: [{ coCode: 'CO4', poCode: 'PO1', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct3', qNo: 4, maxMarks: 5, tags: [{ coCode: 'CO4', poCode: 'PO2', marks: 5 }] },

    /* --- Class Test 4 --- */
    { courseCode: 'ECE 1101', paper: 'ct4', qNo: 1, maxMarks: 5, tags: [{ coCode: 'CO1', poCode: 'PO1', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct4', qNo: 2, maxMarks: 5, tags: [{ coCode: 'CO2', poCode: 'PO2', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct4', qNo: 3, maxMarks: 5, tags: [{ coCode: 'CO3', poCode: 'PO5', marks: 5 }] },
    { courseCode: 'ECE 1101', paper: 'ct4', qNo: 4, maxMarks: 5, tags: [{ coCode: 'CO4', poCode: 'PO2', marks: 3 }, { coCode: 'CO4', poCode: 'PO1', marks: 2 }] },

    /* --- Semester final, Part A (Q1-Q4, 30 marks) --- */
    { courseCode: 'ECE 1101', paper: 'finalA', qNo: 1, maxMarks: 8, tags: [{ coCode: 'CO1', poCode: 'PO1', marks: 8 }] },
    { courseCode: 'ECE 1101', paper: 'finalA', qNo: 2, maxMarks: 7, tags: [{ coCode: 'CO2', poCode: 'PO1', marks: 4 }, { coCode: 'CO2', poCode: 'PO2', marks: 3 }] },
    { courseCode: 'ECE 1101', paper: 'finalA', qNo: 3, maxMarks: 8, tags: [{ coCode: 'CO2', poCode: 'PO2', marks: 8 }] },
    { courseCode: 'ECE 1101', paper: 'finalA', qNo: 4, maxMarks: 7, tags: [{ coCode: 'CO3', poCode: 'PO5', marks: 7 }] },

    /* --- Semester final, Part B (Q5-Q8, 30 marks) --- */
    { courseCode: 'ECE 1101', paper: 'finalB', qNo: 5, maxMarks: 8, tags: [{ coCode: 'CO3', poCode: 'PO2', marks: 8 }] },
    { courseCode: 'ECE 1101', paper: 'finalB', qNo: 6, maxMarks: 7, tags: [{ coCode: 'CO3', poCode: 'PO5', marks: 7 }] },
    { courseCode: 'ECE 1101', paper: 'finalB', qNo: 7, maxMarks: 8, tags: [{ coCode: 'CO4', poCode: 'PO1', marks: 8 }] },
    { courseCode: 'ECE 1101', paper: 'finalB', qNo: 8, maxMarks: 7, tags: [{ coCode: 'CO4', poCode: 'PO2', marks: 4 }, { coCode: 'CO1', poCode: 'PO1', marks: 3 }] }
  ],

  /* QuestionMark { studentId, courseCode, paper, qNo, marks }
     Filled in by the loop below for the demo batch. */
  questionMarks: []
};

/* -----------------------------------------------------------------
   Fill in the placeholder marks + attendance for the Series 24 batch.
   Kept as a small, obvious loop rather than thousands of hand-typed
   rows. The roster now sits in 2-1, but their finished first-semester
   results are what we have, so only the two 1-1 theory courses get
   sample records; everything else is entered through the app.
   ----------------------------------------------------------------- */
(function seedMarksAndAttendance(seed) {
  'use strict';

  // The whole roster: u-stu-1 ... u-stu-60 (roll 2410001 ... 2410060).
  var batch = [];
  for (var n = 1; n <= 60; n++) batch.push('u-stu-' + n);

  /* One fixed offset per student, cycled down the roster. There is no
     randomness anywhere here, so "Reset demo data" always produces the
     very same numbers and the marks are easy to talk through in class. */
  var offset = [0, -2, -5, -7, -3, -1, 1, -4, 2, -6, -9, -11, -5, -2, -8, -13];

  function shift(i, step) { return offset[(i + step) % offset.length]; }

  function clamp(value, max) {
    if (value < 0) return 0;
    if (value > max) return max;
    return value;
  }

  /* Each class test starts from its own base and then walks one step
     further down the offset list, so a student is not equally good (or
     equally bad) in all four tests and "best 3 of 4" actually matters. */
  var ctBase = [17, 18, 16, 19];                 // each test is out of 20

  function ctMark(i, testNumber) {
    return clamp(ctBase[testNumber - 1] + shift(i, testNumber - 1), 20);
  }
  function asmMark(i) {                          // assignment/quiz/presentation, /10
    return clamp(9 + Math.round(shift(i, 0) / 2), 10);
  }
  function finMark(i) {                          // semester final, /60
    return clamp(50 + shift(i, 0) * 3, 60);
  }

  var days = ['2026-08-24', '2026-08-26', '2026-08-31', '2026-09-02', '2026-09-07'];
  // Attendance patterns across the 5 days (P present, a absent, l late),
  // handed out to the students in turn.
  var att = ['PPPPP', 'PPaPP', 'PlPPa', 'PPPPP', 'aPPlP', 'PPPaP', 'llPaP'];
  var statusOf = { P: 'present', a: 'absent', l: 'late' };

  ['ECE 1101', 'ECE 1103'].forEach(function (code) {
    batch.forEach(function (sid, i) {
      seed.ctMarks.push({ studentId: sid, courseCode: code, testNumber: 1, marks: ctMark(i, 1) });
      seed.ctMarks.push({ studentId: sid, courseCode: code, testNumber: 2, marks: ctMark(i, 2) });
      seed.ctMarks.push({ studentId: sid, courseCode: code, testNumber: 3, marks: ctMark(i, 3) });
      seed.ctMarks.push({ studentId: sid, courseCode: code, testNumber: 4, marks: ctMark(i, 4) });
      seed.assessMarks.push({ studentId: sid, courseCode: code, marks: asmMark(i) });
      seed.finalMarks.push({ studentId: sid, courseCode: code, marks: finMark(i) });

      var pattern = att[i % att.length];
      days.forEach(function (d, k) {
        seed.attendance.push({
          studentId: sid, courseCode: code, date: d,
          status: statusOf[pattern[k]] || 'present'
        });
      });
    });
  });

  /* ---------------------------------------------------------------
     Question-wise marks for ECE 1101 only.

     Rather than inventing new numbers, we take each student's paper
     total from the functions above and spread it over that paper's
     questions. The parts always add back up to the same total, so the
     question-wise screens and the old one-box screens agree.
     --------------------------------------------------------------- */

  // Spread `total` over questions whose maximums are given in `maxes`.
  // Each question first gets its fair share rounded DOWN, then the few
  // marks left over are handed out one at a time from question 1,
  // never pushing a question past its own maximum.
  function splitMarks(total, maxes) {
    var whole = maxes.reduce(function (a, b) { return a + b; }, 0);
    if (total > whole) total = whole;
    if (total < 0) total = 0;

    var got = maxes.map(function (m) { return Math.floor(m * total / whole); });
    var left = total - got.reduce(function (a, b) { return a + b; }, 0);
    var i = 0;
    while (left > 0) {
      if (got[i] < maxes[i]) { got[i] += 1; left -= 1; }
      i = (i + 1) % maxes.length;
    }
    return got;
  }

  // The questions of one paper, in order, for ECE 1101.
  function paperQuestions(paper) {
    return seed.questions.filter(function (q) {
      return q.courseCode === 'ECE 1101' && q.paper === paper;
    });
  }

  function recordPaper(sid, paper, total) {
    var qs = paperQuestions(paper);
    var parts = splitMarks(total, qs.map(function (q) { return q.maxMarks; }));
    qs.forEach(function (q, k) {
      seed.questionMarks.push({
        studentId: sid, courseCode: 'ECE 1101',
        paper: paper, qNo: q.qNo, marks: parts[k]
      });
    });
  }

  batch.forEach(function (sid, i) {
    recordPaper(sid, 'ct1', ctMark(i, 1));
    recordPaper(sid, 'ct2', ctMark(i, 2));
    recordPaper(sid, 'ct3', ctMark(i, 3));
    recordPaper(sid, 'ct4', ctMark(i, 4));

    // The final is out of 60, split evenly between Part A and Part B.
    var total = finMark(i);
    var partA = Math.min(30, Math.round(total / 2));
    recordPaper(sid, 'finalA', partA);
    recordPaper(sid, 'finalB', total - partA);
  });
})(window.OBE_SEED);
