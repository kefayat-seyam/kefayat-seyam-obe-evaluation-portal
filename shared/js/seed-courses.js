/* ------------------------------------------------------------------
 * seed-courses.js  -  AUTO-GENERATED from the RUET ECE syllabus PDF
 * (Syllabus for Undergraduate Studies, session 2020-2021, 1st edition)
 *
 * 122 courses, semester codes are "year-term" ("3-1" = 3rd year odd).
 * Edit freely: this file is only the *starting* data. Once the app has
 * run once, courses live in localStorage and are edited from the Admin
 * module. Use "Reset demo data" in the sidebar to re-seed from here.
 * ------------------------------------------------------------------ */
window.OBE_SEED_COURSES = [
  {
    code: "ECE 1101",
    name: "Circuits & Systems-I",
    credits: 3.0,
    semester: "1-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "DC Analysis", detail: "Introduction of electrical power sources, ideal and practical sources, linear circuit elements, DC analysis of series, parallel and series-parallel circuits. Kirchhoff's Voltage and current laws, voltage, current, power and energy." },
      { title: "Sinusoidal Wave", detail: "Average and effective values, form factor, peak factor, phase relation and phasors. Steady state AC analysis of series, parallel and series parallel circuits, phase relation between voltage and current, concept of impedance, power, power factor, phasor diagram." },
      { title: "Network Theorems", detail: "Superposition theorem, Thevenin's theorem, Norton's theorem, maximum power transfer theorem, substitution theorem and reciprocity theorem. Frequency response of ac circuits, resonance phenomena, periodic signals in time and frequency domains. Circuit analysis using proper simulation tools." },
      { title: "Magnetic Circuit and Concepts", detail: "Flux, fields, permeability reluctance, analysis of series, parallel and series- parallel magnetic circuit." }
    ]
  },
  {
    code: "ECE 1102",
    name: "Circuits & Systems-I Sessional",
    credits: 1.5,
    semester: "1-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 1101" }
    ]
  },
  {
    code: "ECE 1103",
    name: "Computer Programming",
    credits: 3.0,
    semester: "1-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction to Computer Programming", detail: "Compiler, Interpreter, Flow chart design, Writing, Debugging and running programs using C/C++." },
      { title: "C Basics", detail: "Different data types and variables, Operator and operands and its precedence, Input/Output, Conditional operators, Loop structures, Error handling, and Built-in functions." },
      { title: "Functions and Arrays", detail: "Writing & calling of user defined functions, Recursive functions, Introduction to one-dimensional arrays, Multi-dimensional arrays and array manipulation." },
      { title: "Pointers and Strings", detail: "Introduction to pointers, Pointers and array, Pointers and functions, Scope of variables, Dynamic memory allocation, String I/O, String-based built-in functions, String operations, Pointer and string." },
      { title: "Files", detail: "Introduction to files in C, Opening, Closing and updating binary and sequential files." },
      { title: "Advanced Topics", detail: "Structure, Union, Enumeration, Bit fields, Operations on bits, Register variable, Pre-processors and graphics in C." }
    ]
  },
  {
    code: "ECE 1104",
    name: "Computer Programming Sessional",
    credits: 1.5,
    semester: "1-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 1103." }
    ]
  },
  {
    code: "Math 1117",
    name: "Calculus & Ordinary Differential Equation",
    credits: 3.0,
    semester: "1-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Differential Calculus", detail: "Rolle's theorem, Mean value theorem. Taylor's and Maclaurin's theorems in finite and infinite forms. Divergency and Convergency of series. Partial differentiation, Euler's theorem. Tangent, normal and curvature. Determination of maximum and minimum values of functions and their application." },
      { title: "Integral Calculus", detail: "Use of definite integration in summing series. Walli's formulae. Improper integrals. Beta and Gamma functions. Area under a plane curve and area of a region enclosed by two curves in Cartesian and polar coordinates. Volume and surface areas of solids of revolution." },
      { title: "Ordinary Differential Equation", detail: "Degree and order of ordinary differential equations. Formation of differential equations. Solutions of first order differential equations by various methods, Solutions of general linear differential equations of second and higher orders with constant coeff icients, Solution of homogeneous linear differential equation. Solution of differential equation with constant coefficients by operator method." }
    ]
  },
  {
    code: "Phy 1117",
    name: "Optics and Modern Physics",
    credits: 3.0,
    semester: "1-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Optics", detail: "Theories of light: Huygens's principle and construction. Interference of light. Young's double slit experiment, Fresnel bi-prism, Newton's ring," },
      { title: "Interferometers. Diffraction of light", detail: "Fresnel and fraunhofer diffraction, Diffraction by single and double slit, diffraction gratings. Polarization: Production and analysis of polarized light, Optical activity, Optics of crystals." },
      { title: "Waves and Oscillations", detail: "Oscillations: Simple Harmonic Motion, Transverse and" },
      { title: "Longitudinal nature of waves", detail: "Travelling and Standing waves. Intensity of a wave, energy calculation of progressive and Stationary waves. Phase velocity, Group velocity. Sound waves: Velocity of longit ude wave in a gaseous medium, Doppler effect." },
      { title: "Architectural acoustics", detail: "Sabine's formula, requisites of a good auditorium." },
      { title: "Modern Physics", detail: "Atom models : Thomson model, Rutherford atom model, Electron orbits, Bohr atom model, Energy levels and spectra, Particle properties of waves: Photo electric effect, Einstein's photoelectric equation, Laws of photoelectric emission, Compton Effect, Quantum effect: de Broglie waves, Group velocity, phase velocity. Michelson Morley's experiment, Galilean transformation. Spectral theory of relativity, Lorentz Transformation. Relative velocity, length contraction, time dilation, relativity of mass. Mass-energy relation." }
    ]
  },
  {
    code: "Phy 1118",
    name: "Optics and Modern Physics Sessional",
    credits: 0.75,
    semester: "1-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course Phy 1117." }
    ]
  },
  {
    code: "Hum 1117",
    name: "Technical English",
    credits: 3.0,
    semester: "1-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Grammar", detail: "Grammatical principles, modals, phrases & idioms, prefixes & suffixes, sentence structures, w-h & yes/ no question, conditional sentences" },
      { title: "Vocabulary", detail: "Technical & scientific vocabulary, defining terms" },
      { title: "Spoken English", detail: "Introduction to phonetic symbols, dialogue, responding to particular situations, extempore speech." },
      { title: "Reading", detail: "Comprehension of technical & non-technical materials skimming, scanning, inferring & responding to context" },
      { title: "Technical writing", detail: "Paragraph/essay writing on scientific & other themes, report writing, research paper writing, library references," },
      { title: "Professional communication", detail: "Business letter, job application, memos, quotations, tender notice" }
    ]
  },
  {
    code: "Hum 1118",
    name: "Technical English Sessional",
    credits: 0.75,
    semester: "1-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course Hum 1117." }
    ]
  },
  {
    code: "ECE 1100",
    name: "Introduction to Computer System",
    credits: 0.75,
    semester: "1-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Computer Fundamentals", detail: "Introduction to computer basics, types and generation of computers, basic organization and functional units." },
      { title: "Hardware", detail: "Basic units of computer hardware, Processors, input, output and memory devices, keyboard, mouse, OMR, OCR, MICR, CD-ROM, printers, CRT, LCD, LED, microfilm, floppy." },
      { title: "Software", detail: "Types of software, system software: familiarization with various operating systems (Windows, DOS, UNIX, Android, IOS etc.), application software: text processing (MS-WORD, etc.), Spread sheet (MS-EXCEL etc.)." },
      { title: "Computer Ethics", detail: "Computers in the workplace, computer crime, rules of communications, privacy, intellectual property, impact on employment, professional responsibility, and globalization." }
    ]
  },
  {
    code: "ECE 1201",
    name: "Circuits & Systems-II",
    credits: 3.0,
    semester: "1-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Polyphase System", detail: "Balanced and unbalanced three phase circuit analysis. Two-port network analysis. Coupled circuit. Analogous system, Response to non-sinusoidal voltage." },
      { title: "Linear System", detail: "Transform methods, Purpose and nature of transform, Fourier and Laplace transforms. Impulse function. Convolution integral and their application to network and system analysis." },
      { title: "Filter", detail: "Introduction to filter, Filter equations, Modern filters." }
    ]
  },
  {
    code: "ECE 1202",
    name: "Circuits & Systems-II Sessional",
    credits: 0.75,
    semester: "1-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 1201." }
    ]
  },
  {
    code: "ECE 1203",
    name: "Object Oriented Programming",
    credits: 3.0,
    semester: "1-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Fundamentals of OOP", detail: "Introduction to Object Oriented Programming, Principles of Object-Oriented Design." },
      { title: "Classes and Objects", detail: "Structure of Class, Access Modifiers, Encapsulation and Information-hiding, Inheritance, Polymorphism, Data binding, Static and dynamic binding, Nested Classes, Abstract Classes, Interface, Arrays of Objects, Pointer to Objects, Friend function, Data abstraction." },
      { title: "Constructors and Destructors", detail: "Default constructor, Copy constructor, Dynamic constructor, Constructor function for derived classes and their order of execution, Destructor." },
      { title: "Inheritance", detail: "Mode of inheritance, Single inheritance vs. multiple inheritance, Virtual inheritance." },
      { title: "Polymorphism", detail: "Operator and Function overloading, Run-time and Compile time Polymorphism, Virtual function, Errors and Exception Handling." },
      { title: "Advanced Topics", detail: "Persistent Objects, Objects and Portable Data, UML Basics, GUI Design (Frame, Panel, Button, Different I/O fields etc.), Multithreading." }
    ]
  },
  {
    code: "ECE 1204",
    name: "Object Oriented Programming Sessional",
    credits: 1.5,
    semester: "1-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 1203." }
    ]
  },
  {
    code: "ECE 1205",
    name: "Analog Electronic Circuits-I",
    credits: 3.0,
    semester: "1-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Signal", detail: "Signals, their origin and processing in electronic system. Development of electronic processing devices, Vacuum tubes and semiconductor devices, P-N junction semiconductor diodes, Application of diode as rectifier, Zener diode and its application." },
      { title: "BJT, FET, MOSFET", detail: "Characteristics, Biasing techniques, Stabilization factors, Compensation. Equivalent circuits, single stage amplifiers at midband frequencies. Power amplifiers and Heat sink." }
    ]
  },
  {
    code: "ECE 1206",
    name: "Analog Electronic Circuits-I Sessional",
    credits: 0.75,
    semester: "1-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 1205." }
    ]
  },
  {
    code: "Math 1217",
    name: "Transform Methods, Statistics & Complex Variable",
    credits: 3.0,
    semester: "1-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Harmonic Analysis and Laplace Transform", detail: "Periodicity, Fourier series, Dirichlet's conditions, odd and even functions, Fourier transforms and Fourier integral and their applications to solve boundary value problems. Laplace transforms, Inverse Laplace transforms, Solution of differential equation by Laplace transforms." },
      { title: "Statistics", detail: "Frequency distribution, mean, median, mode, and other measures of central tendency, standard deviation and other measures of dispersion, moments, skewness and kurtosis, elementary probability theory and discontinuous probability distributions- binomial, Po isson, negative binomial, continuous probability distributions- exponential and normal distribution, characteristics, elementary sampling theory, estimation, hypothesis testing and regression analysis." },
      { title: "Complex Variable", detail: "Complex number systems, analyticity, singularity, limits of continuity of a function and related theorems, Complex differentiation and the Cauchy-Riemann equations, mapping by elementary functions, Infinite series, Convergence, Line integration, Cauchy integral theorem, Cauchy integral formula, Liouville's theorem, Taylor's and Laurent's theorems, Singular points, Residue, Cauchy's residue theorem, Contour integration." }
    ]
  },
  {
    code: "Hum 1217",
    name: "Government, Sociology, Environment Protection & History of Independence",
    credits: 3.0,
    semester: "1-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "History of Independence", detail: "The movements during British period (1857-1947)," },
      { title: "Language Movement of 1952. Background of Independence", detail: "Six Points and Bengali Nationalism in 1966, Mass Upsurge in 1969, The General Election of 1970 and Later Events, Historic Speech of 7th March by Bangabandhu, The Genocide of 25th March. The Birth of Independent Bangladesh in 1971." },
      { title: "Sociology & Government", detail: "Scope, Culture and civilization Relationship, Social structure of Bangladesh. Industrial revolution, Urbanization and industrialization, Urban Ecology, Cyber-crime and delinquency, Sociology of Education. Relationship-Sociology and cyber-crime. Causes and remedies of cyber-crime. Basic concepts of government and politics. Functions, Organs and forms of modern state and Government, Socialism. Capitalism, UNO, government and politics of Bangladesh, Some major administrative systems of developed counties. Local self- government. Central government, Public opinion." },
      { title: "Environmental Protection", detail: "The environment and environmental protection, Sustainability and the difficulty of environmental protection, unintended consequences of actions and effects on the environment, Developing countries and environmental problems." },
      { title: "Pollution", detail: "Types of Environmental pollutions and threats, Source of pollution and their types, controlling pollution and improving quality. Climate change and global warming: Causes, effects and future." },
      { title: "Environmental Laws", detail: "National and global environmental law and policy, economic steps to protect the environment." }
    ]
  },
  {
    code: "ECE 1200",
    name: "Engineering Ethics",
    credits: 0.75,
    semester: "1-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Introduction to Engineering Ethics", detail: "Overview of Ethics, Engineering Ethics, Codes of Ethics, Principles of engineering ethics, Individual, Professional, and Institutional Values, Leadership in Engineering and Industry, Competency with Good Character." },
      { title: "Ethical Theories, Rights & Protection", detail: "Liberal Individualism, Utilitarianism/Consequentialism and Deontology, Protections of Human-Animal Subjects and environment, Data Management and Intellectual Property Rights." },
      { title: "Research Integrity and Professional Integrity for Engineers", detail: "Research Integrity: Scientific misconduct-falsification of data, fabrication of data, plagiarism, unethical treatment of research subjects, and failure to disclose conflicts of interest. Engineering ethics, Professional Integrity/Ethics-fraud, corrupti on, mismanagement, poor product, design, deliberate design faults or and harms from engineering projects/products" },
      { title: "Sustainability and Engineering Ethics", detail: "overview of sustainability, current topics in engineering ethics regarding sustainability: adaptive design, green technologies, and other appropriate topics in sustainability." },
      { title: "Case Studies", detail: "B.F. Goodrich Air Force A7-D Brake Problem Case and the Whistleblowing Debate, Finish Challenger Case, Ford Pinto Case, Chernobyl and Three Mile Island, and current cases." }
    ]
  },
  {
    code: "ECE 2103",
    name: "Data Structure & Algorithms",
    credits: 3.0,
    semester: "2-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Data Structure Introduction", detail: "Concepts and Examples of Elementary Data Objects, Necessity of Structured Data, Types of Data Structure, Ideas on Linear and Nonlinear Data Structure." },
      { title: "Linear Array", detail: "Linear Array & its representation in memory, Traversing LA, Insertion & Deletion in LA, Bubble Sort, Linear Search & binary Search, Multidimensional Array & its representation in memory, Algebra of matrices, Sparse matrices." },
      { title: "Stack and Queue", detail: "Stack representation & applications, PUSH and POP operation on stack, Queue representation, Insertion & deletion in Queue, Priority Queues." },
      { title: "Linked List", detail: "Linked list & its representation in memory, Traversing, Searching, Insertion & Deletion operation on Linked list, Circular List, Header linked lists, Two-way lists." },
      { title: "Tree", detail: "Tree terminology, representation of binary trees in memory, Traversing binary tree, Binary search tree, Insertion & deletion on binary search tree, B trees, General tree." },
      { title: "Algorithm Complexity", detail: "Algorithm and flow chart, Complexity analysis of algorithms, worst case, best case and average case, Rate of growth, Big-O notation, Complexity of Linear Search & Binary search." },
      { title: "Sorting Algorithms", detail: "Insertion sort, selection sort, quick sort, merge sort, Searching & data modification, Hash function, collision resolution, Chaining." },
      { title: "Shortest Path", detail: "Dijkstra's Algorithm, Bellman-Ford Algorithm." },
      { title: "Searching algorithms", detail: "Binary search trees, balanced binary search trees, B-trees, skip lists, hashing. Priority queues, heaps." },
      { title: "Graph algorithms", detail: "Representation of Graphs, Breadth First Search, Depth First Search, Minimum Spanning Tree." },
      { title: "Recurrences & Backtracking", detail: "Recurrences, NP-Hard and NP-Complete Problems, Backtracking, n-Queen Problem." }
    ]
  },
  {
    code: "ECE 2104",
    name: "Data Structure & Algorithms Sessional",
    credits: 1.5,
    semester: "2-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 2103." }
    ]
  },
  {
    code: "ECE 2105",
    name: "Analog Electronic Circuits-II",
    credits: 3.0,
    semester: "2-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "BJT, FET, MOSFET", detail: "Multistage amplifier circuits. Frequency response of single stage and multistage amplifiers. Introduction to CMOS and its applications." },
      { title: "Feedback Concept", detail: "Improvement of amplifier characteristics by negative feedback. Classification, analysis of feedback amplifiers. Op-amps and its applications, integrator and differentiator, Frequency response, bandwidth and other practical limitations of op-amps, compensa tion techniques. Oscillators and multi-vibrators. Active filters. Negative impedance converters. Times 555 and its applications." }
    ]
  },
  {
    code: "ECE 2106",
    name: "Analog Electronic Circuits-II Sessional",
    credits: 0.75,
    semester: "2-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 2105." }
    ]
  },
  {
    code: "ECE 2111",
    name: "Digital Techniques",
    credits: 3.0,
    semester: "2-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Information and Digital Systems", detail: "Introduction to digital systems, Number Systems, weighted and non-weighted codes, error detection code, Binary addition and subtraction, 2's compliment methods." },
      { title: "Boolean Algebra and Combinational Logic Circuits", detail: "Digital logic, Boolean algebra, Boolean function, Canonical forms, Karnaugh Maps, Minimization of Boolean functions, Logic gates and their truth tables, Design methodologies, Combinational logic circuit design, Arithmetic and data handling logic circuits . Decoders, Encoders, Multiplexer, Demultiplexer." },
      { title: "Flip Flop and Sequential Logic Circuits", detail: "Transistor Latch, NAND gate latch," },
      { title: "NOR gate latch, D latch. Clock signals and Clocked FFs", detail: "Clocked SR, JK and D Flip-Flops, Master/Slave JK FF, timing diagram of different FFs, Edge-triggered and level-triggered timing diagrams, Counters, registers, memory devices and their applications, state machine." },
      { title: "Technology Parameters", detail: "Fan in, Fan out, Propagation delay, Power dissipation and noise immunity." }
    ]
  },
  {
    code: "ECE 2112",
    name: "Digital Techniques Sessional",
    credits: 0.75,
    semester: "2-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 2111." }
    ]
  },
  {
    code: "Math 2117",
    name: "Vector Analysis & Linear Algebra",
    credits: 3.0,
    semester: "2-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Vector Analysis", detail: "Vectors, Differentiation and integration, Line, surface and volume integrals, Gradient of a function, Divergence and curl of vector and their applications, Physical significance of gradient, divergence and curl, Vector identities, Integral forms of gradient, divergence and curl, Green's, Gauss's divergence and Stock's theorem." },
      { title: "Matrix", detail: "Definition of matrices, Equality of two matrices, Addition, Subtraction and Multiplication of matrices, Equivalence of matrices, Positive and Negative matrices, Adjoint of matrices, Transpose and inverse of matrices, Rank and normal form of matrices, Syste m of linear equations, Solution of homogeneous and non-homogeneous systems, Determination of Eigen values and Eigen vectors, Solution of matrix differential equations." },
      { title: "Linear Algebra", detail: "Vector space, Subspace, sum and direct sum, Hilbert space, Normed linear space, Branch space, Basis and Dimension, Linear transformation: Range, Kernel, Nullity, singular and non-singular transformation, Linear operations: Matrix representation of a linear operator, Change of basis, Similarity and linear mapping." }
    ]
  },
  {
    code: "Chem 2117",
    name: "Inorganic and Physical Chemistry",
    credits: 3.0,
    semester: "2-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Overview", detail: "Atomic structure-general concept of fundamental particles, Boh'r model, spectrum, quantum number, and electronic configuration. Periodic Table and Periodic Properties-periodic law, features of modern periodic table, classification of elements, merits and demerits, periodicity, atomic size, ionization potential, electron affinity, and electronegativity. Chemical Bonding- different types of chemical bonds and their properties. Acid and bases-modern concepts of acid and bases, pH and buffer solution. Titration. Solution- Types and composition of solution, Henry's law, and solution of gas in liquid, solid in liquid, colligative properties of dilute solution, lowering of vapor pressure, elevation of boiling point, depression of freezing point, osmosis and osmotic pressure. Chemical Kinetics-Rate of reaction, order, molecularity, different types of rate expressions, effect of temperature on reaction rate, collision theory. Chemical Equilibrium-Reversible reaction, law of mass action, evaluation and characteristics of equilibrium constant of reaction, the Lechatelier's principle. Thermochemistry- Laws of thermochemistry, heat of reaction, heat of solution, heat of neutralization, heat of formation, heat of combustion, and experimental determination of thermal changes during chemical reactions. Electrochemistry-electrolytes, mechanism of electrolyte conduction and different types of cells." }
    ]
  },
  {
    code: "Chem 2118",
    name: "Inorganic and Physical Chemistry Sessional",
    credits: 0.75,
    semester: "2-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course Chem 2117." }
    ]
  },
  {
    code: "ECE 2100",
    name: "Software Development Project-I",
    credits: 0.75,
    semester: "2-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Students will develop one or more programs/projects on same practical problems with sound software engineering practices as assigned by teacher." }
    ]
  },
  {
    code: "ECE 2207",
    name: "Electrical Machine-I",
    credits: 3.0,
    semester: "2-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Transformer", detail: "Ideal transformer-transformation ratio, no-load and load vector diagrams, actual transformer-equivalent circuit, regulation, short circuit and open circuit tests. Three phase transformer and its connections, Vector group of three phase transformers, Phase conversion." },
      { title: "Three Phase Induction Motor", detail: "Rotating magnetic field, equivalent circuit, vector diagram, torque-speed characteristics, effect of changing rotor resistance and reactance on torque-speed curves, motor torque and developed rotor power, no-load test, blocked rotor test, starting and braking and speed control, Induction generator." },
      { title: "Single Phase Induction Motor", detail: "Theory of operation, equivalent circuit and starting." }
    ]
  },
  {
    code: "ECE 2208",
    name: "Electrical Machine-I Sessional",
    credits: 0.75,
    semester: "2-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 2207." }
    ]
  },
  {
    code: "ECE 2213",
    name: "Numerical Methods & Discrete Mathematics",
    credits: 3.0,
    semester: "2-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Modeling, Computers and Error Analysis", detail: "Mathematical modeling and engineering problem solving, Programming and software, Approximations and round-off errors, Truncation errors and the Taylor series." },
      { title: "Roots of Equations", detail: "Bracketing Methods, Open Methods, Roots of polynomials." },
      { title: "Linear Algebraic Equations", detail: "Gauss elimination, LU Decomposition and Matrix Inversion, Gauss-Seidel." },
      { title: "Curve Fitting", detail: "Least-square Regression. Interpolation, Interpolation with one and two independent variables, Formation of different difference table, Newton's forward and backward difference, LaGrange's interpolation." },
      { title: "Numerical Integration", detail: "Newton-Cotes Integration formulas, Integration of equations." },
      { title: "Optimization", detail: "One-dimensional Unconstrained optimization." },
      { title: "Numerical Differentiation and Differential Equations", detail: "Runge-Kutta Methods, Boundary-Value and Eigenvalue problems, Numerical solution of partial differential equations" },
      { title: "Set", detail: "Operations on Sets, Algebraic Properties of Set, Computer Representation of Set, the Power Set Theorem." },
      { title: "Relation", detail: "Property of Relation, Binary Relations, Partial Ordering Relations, Equivalence Relations." },
      { title: "Propositional Logic", detail: "Syntax, Semantics, Valid, Satisfiable and Unsatisfiable Formulas, Encoding and Examining the Validity of Some Logical Arguments, Predicate and Quantifier, Universal and Existential Quantification, Modus Ponens and Modus Tollens." },
      { title: "Proof Techniques", detail: "The Structure of Formal Proofs, Direct Proofs, Proof by Contradiction, Mathematical Induction" },
      { title: "Number Theory", detail: "Theorem of Arithmetic, Modular Arithmetic, GCD, LCM, Prime Number, Congruence, Application of Congruence, Application of Number Theory, Chinese Remainder Theory." },
      { title: "Introduction to Counting", detail: "Basic Counting Techniques-Inclusion and Exclusion, PigeonHole Principle, Permutation, Combination." }
    ]
  },
  {
    code: "ECE 2214",
    name: "Numerical Methods & Discrete Mathematics Sessional",
    credits: 1.5,
    semester: "2-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 2213." }
    ]
  },
  {
    code: "ECE 2215",
    name: "Data Base Systems",
    credits: 3.0,
    semester: "2-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Concepts of database systems", detail: "Files and Databases, Database Management Systems, Transaction management, Structure of a DBMS, Applications" },
      { title: "Entity-Relationship concepts", detail: "Entity types, Entity set, Attribute and key, Relationships, Relation types, Entity relationship, ER modeling, ER diagrams, Database design using ER diagrams, Enhanced Entity-Relationship (EER) model" },
      { title: "Normalization", detail: "Normal forms, Normalized Relations and Database performance, De-normalization" },
      { title: "Relational model", detail: "Structure of relational databases, Relational algebra, Relational algebra operations, Modification of the database, Introduction to views, Pitfalls in relational database design." },
      { title: "SQL", detail: "Data Definition Language, Data Manipulation Language, Basics of SQL, Query designing in SQL using aggregate functions and nested queries, Embedded SQL, Triggers, Procedures, Indexes, Declarative Constrains and Database Triggers" },
      { title: "Concurrency control", detail: "Lock based protocols, Timestamp based protocols, Validation based protocols, Deadlock." },
      { title: "Recovery system", detail: "Failure classification, Storage structure, Recovery and atomicity, Log-based recovery, Recovery with concurrent transactions, Advanced recovery techniques, RAID model." },
      { title: "Advanced database management systems", detail: "No SQL Systems, distributed systems, object-oriented System, Temporal, Database Security, Data Warehousing and Data Mining, Database Administration and Tuning." }
    ]
  },
  {
    code: "ECE 2216",
    name: "Data Base Systems Sessional",
    credits: 1.5,
    semester: "2-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 2215." }
    ]
  },
  {
    code: "Math 2217",
    name: "Co-ordinate Geometry and Partial Differential Equations",
    credits: 3.0,
    semester: "2-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Co-ordinate Geometry", detail: "Coordinate geometry of three dimension-System of coordinates, transformations of coordinates, distance between two points, section formula, projection, direction cosines, equations of planes and lines." },
      { title: "Partial differential equations", detail: "Four rules for solving simultaneous equations of the form P=Q=r, Lagrange's method of solving PDE of order one, Integral surfaces passing through a given curve, Non-linear PDE of order one (complete, Particular, Singular and general integrals), Charpit's method, Second order PDE, Its nomenclature and classifications to canonical (Standard) parabolic, elliptic, hyperbolic, Solution by separations of variables, Linear PDE with constants coefficients." },
      { title: "Series solution", detail: "Solution of differential equations in series by the method of Frobenius, Bessel's functions, Legendre's Polynomials and their properties." }
    ]
  },
  {
    code: "Hum 2217",
    name: "Legal Issues, Industrial & Operational Management",
    credits: 3.0,
    semester: "2-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Business and industrial law", detail: "Law of contract, elements of valid contract. Consideration, Parties competent to contact. Sale of goods, hire and purchase. Negotiable instrument." },
      { title: "Industrial law in Bangladesh", detail: "various ordinance payments of wages, legislation relating employment in industries, factories, shops and agriculture, trade union act." },
      { title: "Industrial Management", detail: "Principles of Management, Management functions, Management Skills, Authority and Responsibility, Span of Control, Management by Objective, Consultative Management, Participative Management, Decision" },
      { title: "Making, Manpower Motivation, Human Resources Management", detail: "Manpower planning, recruitment and selection, Employee Training and Development, Performance Appraisal, Wages and Salary administration, Production" },
      { title: "Management", detail: "Plant Layout: definition, basic layout types, problem solving, Linear Programming, EOQ, Lead Time, Safety Stock, Re-order Point." },
      { title: "Operational Management", detail: "Production systems, product/service life cycle, forecasting models, bill of materials, material and inventory management: Inventory models, ABC analysis, coding and standardization. Aggregate planning, MPS, MRP, capacity planning, operating scheduling, fa cility location algorithm, facility layout techniques, work study." },
      { title: "Safety", detail: "Evolution of modern safety concepts, industrial hazard, safety and risk management, productivity, worker health and safety, proactive management techniques for safety management, safety standards and regulations for engineering works, fire safety, hazardous materials." }
    ]
  },
  {
    code: "ECE 2200",
    name: "Electronic Shop Practice",
    credits: 1.5,
    semester: "2-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Introduction", detail: "Formal procedures of preventive maintenance. Circuit tracing, trouble shooting, fault repairing, soldering and de-soldering of electronic circuits. Design of PCB layout, etching." },
      { title: "Radio receivers", detail: "Principles of operations, circuit tracing, fault finding by signal injection alignment. TV camera, B/W TV, color TV, CD and VCD player." }
    ]
  },
  {
    code: "ECE 3107",
    name: "Electrical Machine-II",
    credits: 3.0,
    semester: "3-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "DC Generators", detail: "Types, no-load voltage characteristics, buildup of a self-excited shunt generator, load-voltage characteristic, effect of speed on no-load and load characteristics and voltage regulation, armature reaction." },
      { title: "DC Motor", detail: "Operating principle, counter emf, torque, speed, torque-speed characteristics, starting, braking, and speed control." },
      { title: "Synchronous Generator", detail: "Windings, excitation systems, equivalent circuit, vector diagrams at different loads, factors affecting voltage regulation, synchronous impedance, synchronous impedance methods of predicting voltage regulation and its limitations. Parallel operation: nece ssary conditions, synchronizing, circulating current and vector diagram." },
      { title: "Synchronous Motor", detail: "Operation, loading effect, effect of changing excitation, V-curves, and starting methods." },
      { title: "Special machines", detail: "Stepper motor, Hysteresis motor, Servo motor, Repulsion Motor, Magnetic levitation etc." }
    ]
  },
  {
    code: "ECE 3108",
    name: "Electrical Machine-II Sessional",
    credits: 0.75,
    semester: "3-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3107." }
    ]
  },
  {
    code: "ECE 3111",
    name: "Microprocessor, Assembly Language & Interfacing",
    credits: 3.0,
    semester: "3-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Microprocessor and Microcomputer Based System Design", detail: "Introduction to different types of microprocessors and its applications, organization of Intel 8086/8088 Microprocessor, the component of microcomputer system, Hardware and software interfacing in microcomputer system design, hardware and I/O design, building, debugging, testing and linking program modules, programming EPROM." },
      { title: "I/O Controller and Interrupt Components", detail: "8284A programmable timer, bus architecture, bus timing, 8286 transceiver device, 8282 latches, 8288 bus controller, Sources of interrupt, types of interrupts, handling interrupt request, interrupt vector and table, 8259A priority interrupt controller, dai sy chain, DMA controller i.e., 8237A DMA Controller, interrupt controller, communication interface, interval timer, etc." },
      { title: "Interfacing and Peripheral System", detail: "Interfacing ICs of I/O Devices, I/O ports, Programmable peripheral interface, I/O interface, serial I/O interface, 8251A communication interface, 8255A Programmable peripheral Interface." },
      { title: "Introduction of Assembly Language", detail: "Program structure and its components, few basic instruction, input/output instruction." },
      { title: "Flag Register and Flow Control", detail: "The flag register, flow control instructions, conditional and unconditional jumps, branching and looping structures." },
      { title: "Logic and Arithmetic Operation", detail: "Logic, Shift and Rotate Instruction, multiplication and division Instructions." },
      { title: "Arrays, Data Structure and String Manipulation", detail: "Arrays and related addressing modes, DUP operator, register indirect modes, Based and Indexed addressing modes, basic stack operations, procedures declaration, communication between procedures, calling a procedure, the string instructions, director flag, moving a string, storing a string, loading a string, scanning a string, comparing strings, substring operation" }
    ]
  },
  {
    code: "ECE 3112",
    name: "Microprocessor, Assembly Language & Interfacing Sessional",
    credits: 1.5,
    semester: "3-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3111." }
    ]
  },
  {
    code: "ECE 3117",
    name: "Software Engineering & Information System Design",
    credits: 3.0,
    semester: "3-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction", detail: "Introduction to Software and its Nature, Software Engineering Methods, Different Types of Software Process Model." },
      { title: "Software Requirement Analysis and design", detail: "Software Requirements Analysis and their Applications, Software Prototyping." },
      { title: "Design of Software", detail: "Software Design and its Different Techniques, Software Configuration Managements. System Structuring, Control Models" },
      { title: "Software Testing", detail: "Verification and Validation Planning, Software's Testing Strategies and Different Type of Testing Techniques," },
      { title: "Software Quality Assurance", detail: "Management and its Quality Assurance, Concepts of Software Reengineering." },
      { title: "Application Development Policy and Strategies", detail: "Planning of Information System, Policy in Information System Development, Strategies for Achieving Information System Goals." },
      { title: "Application System Development Life Cycle", detail: "Phases in Application System Development, Interrelationship among Each Phase. Feasibility Assessment: Problems and Needs in Information System Development." },
      { title: "Feasibility Assessment", detail: "Economic, Technical, Operational and Schedule Feasibility." },
      { title: "Information Requirements Determination", detail: "Strategies for Obtaining Information Requirements, Methods for Providing Assurance that Requirement are Correct and Complete." },
      { title: "Structured Systems Analysis & Design", detail: "Steps in Structured Systems Analysis, Activity Diagrams and Related Documentation, Problem Analysis, New System Design." }
    ]
  },
  {
    code: "ECE 3118",
    name: "Software Engineering & Information System Design Sessional",
    credits: 0.75,
    semester: "3-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3117." }
    ]
  },
  {
    code: "ECE 3119",
    name: "Computer Architecture and Design",
    credits: 3.0,
    semester: "3-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction to computer Architecture", detail: "Internal structure of processor/CPU-registers, PC, ALU, CU, etc. Bus architecture and processor interaction with memory and peripherals, Memory hierarchy in terms of cache memory, main memory, secondary storage, Memory organization into bytes and words, big-endian and little-endian organization, Computer Peripherals, Introduction to Von Neumann SISD organization, RISC and CISC machines." },
      { title: "Computer Arithmetic", detail: "Representation of strings, Binary and hex integer representations and conversions, Signed and unsigned formats, 2's complement, Computer integer arithmetic, Fixed-point arithmetic, IEEE floating point representation and arithmetic." },
      { title: "Process and Control", detail: "Fetch-Execute cycle, Encoding and decoding of MIPS machine instructions, The MIPS CPU instruction set syntax and semantics, addressing modes, MIPS assembly language programming, register usage conventions, use of stack and stack-frame for supporting function calling with parameters, Operating system calls and I/O operations. CPU and It`s Instruction Set Design." },
      { title: "Application HDL and FPGA for microcomputer design", detail: "Introduction to FPGA and HDL/VHDL for digital design implementation." }
    ]
  },
  {
    code: "ECE 3121",
    name: "Electromagnetic Fields & Waves",
    credits: 3.0,
    semester: "3-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Overview", detail: "Electrostatics and Magneto statics using vector methods. Fields in dielectrics and conductors. Boundary conditions of Electric and Magnetic fields. Time Varying Fields, Maxwell's equation and pointing vector. Uniform plane wave and its transmission and reflection. Skin effect and Surface resistance. Wave guides. Introduction to radiation system." }
    ]
  },
  {
    code: "CE 3100",
    name: "Civil Engineering Drawing",
    credits: 0.75,
    semester: "3-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Introduction, Scale drawing, Sectional drawing, Isometric drawing, Missing line, Auxiliary view. Detail and assembly drawing, Plane geometry, Pentagon, Hexagon, Octagon, Ellipse, Parabola, Hyperbola. Projection, Project on Engineering Drawing and CAD using AUTOCAD or contemporary packages instructed by the teachers. Plan, elevation and section of one-storied buildings." }
    ]
  },
  {
    code: "ECE 3100",
    name: "Software Development Project-II",
    credits: 0.75,
    semester: "3-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Students will work in groups or individually to develop web-based applications and design a web site by adding client side and server-side scripting and interfacing the web applications to a database." }
    ]
  },
  {
    code: "ECE 3205",
    name: "Industrial Electronics",
    credits: 3.0,
    semester: "3-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Power semiconductor switches and triggering devices", detail: "BJT, MOSFET, SCR," },
      { title: "IGBT, GTO, TRIAC, UJT and DIAC. Rectifiers", detail: "Uncontrolled and controlled single phase and three phases." },
      { title: "Regulated power supplies", detail: "Linear-series and shunt, switching buck, buckboost, boost and cuk regulators. AC voltage controllers, single and three phases. Choppers. DC motor control. Single phase cyclo converter." },
      { title: "Inverters", detail: "Single phase and three phase current and voltage sources. AC motor control. Stepper motor control. Resonance inverters. Pulse width modulation control of static converters." },
      { title: "Analog and Digital Power Devices", detail: "Sensors, Transducers, D/A interface, A/D interface, AD and DA converters related chips, High power devices." }
    ]
  },
  {
    code: "ECE 3206",
    name: "Industrial Electronics Sessional",
    credits: 0.75,
    semester: "3-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3205." }
    ]
  },
  {
    code: "ECE 3207",
    name: "Communication Engineering",
    credits: 3.0,
    semester: "3-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Overview of Communication System", detail: "Basic principles, fundamental elements, system limitations, message source, bandwidth requirements, transmission media types, bandwidth and transmission capacity. Noise: Source, characteristics of various types of noise and signal to noise ratio. Communic ation systems: Analog and digital." },
      { title: "Continuous Wave Modulation", detail: "Amplitude, Angle Modulations & Demodulations, Sampling and Pulse Modulations-PAM, PWM, PPM, PCM, DM, line coding- formats and bandwidths." },
      { title: "Binary Modulated Band Pass Signaling", detail: "OOK, BPSK, DPSK, FSK, MSK bandwidth requirements, detection and noise performance, Multilevel Modulated Bandpass Signaling," },
      { title: "Multiplexing", detail: "TDM- principle, receiver synchronization, frame synchronization, TDM of multiple bit rate systems, FDM-principle, de-multiplexing, wavelength- division multiplexing multiple-access network-time-division multiple-access, frequency-division multiple access , code-division multiple-access-spread spectrum multiplexing, coding techniques and constraints of CDMA." },
      { title: "Communication system design", detail: "design parameters, channel selection criteria and performance simulation." }
    ]
  },
  {
    code: "ECE 3208",
    name: "Communication Engineering Sessional",
    credits: 0.75,
    semester: "3-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3207." }
    ]
  },
  {
    code: "ECE 3221",
    name: "Operating System",
    credits: 3.0,
    semester: "3-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction to operating system", detail: "Operating system concepts, its role in computer systems, computer system structure, fundamentals of different types of computer system, operating system structure and operation, protection and security." },
      { title: "Process management", detail: "Process concept, model and implementation, process state, process scheduling, inter-process communication (IPC), multiprocessing and time sharing, interaction between process and operating system," },
      { title: "CPU scheduling", detail: "Scheduling concepts, scheduling criteria, scheduling algorithms (SJF, FIFO, round robin, etc.)." },
      { title: "Memory Management", detail: "Memory portioning, with and without swapping, virtual memory-paging and segmentation, demand paging, page replacement algorithms, implementation." },
      { title: "File systems", detail: "FS services, disk space management, directory and data structures." },
      { title: "Deadlocks and Case study", detail: "Modeling, detection and recovery, prevention and avoidance, Case study of some operating systems." },
      { title: "Others", detail: "Introduction to the different smart device Operating systems and their usage." }
    ]
  },
  {
    code: "ECE 3222",
    name: "Operating System Sessional",
    credits: 0.75,
    semester: "3-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3221." }
    ]
  },
  {
    code: "ME 3219",
    name: "Basic Mechanical Engineering",
    credits: 3.0,
    semester: "3-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Overview", detail: "Study of fuels. Steam generation units with accessories and mountings. Study of steam generation and steam turbines. Introduction to internal combustion engines and their cycles. Study of SI and CI engines and gas turbines with their accessories. Refrigeration and air conditioning with their application. Refrigeration equipment: compressors, condensers and evaporators. Type of fluid machinery. Study of impulse and reaction turbine. Pelton wheel and Kaplan turbine. Study of centrifugal and axial flow machines. Pumps, fans, blowers and compressors. Study of reciprocation pumps." }
    ]
  },
  {
    code: "ME 3220",
    name: "Basic Mechanical Engineering Sessional",
    credits: 0.75,
    semester: "3-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 3219." }
    ]
  },
  {
    code: "Hum 3217",
    name: "Economics & Accountancy",
    credits: 3.0,
    semester: "3-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Economics", detail: "Nature of the economics theory applicability of economic theory to the problems of developing countries, some basic concepts supply, demand and their elasticity. Economics and technology. Producer's equilibrium-isoquant. Production-factors of production, production possibility curve-equilibrium of a firm, fixed cost and variable cost, laws of returns, internal and external economics and dis-economics, Input output analysis. Economic growth and economic development and planning basic concept-saving, investment, GNP, NNP, percapita income, growth rate, Fiscal policy, monetary policy and trade policy and their relative applicability in Bangladesh, Planning Five-year plans of Bangladesh, development problems related to agriculture. Industry and population of Bangladesh" },
      { title: "Accountancy", detail: "Basic accounting principles, Objectives of Accounting, Transaction, Double Entry systems, Accounts and it's classification, Journals Cash book, Ledger, Trial Balance, Financial statement. Cost Accounts & objectives, Costs, Classification, Preparation of cost sheet, Cost volume profit (CVP) analysis, Standard costing, Process costing." }
    ]
  },
  {
    code: "ECE 3200",
    name: "Electrical Services Design",
    credits: 1.5,
    semester: "3-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Introduction", detail: "Electrician's tools, splices, soldering, code practices. Electrical and electronic symbols, Safety rules, electricity rules and electricity codes. Terminology and definitions: fuses, circuit breakers, distribution boxes, cables, bus-bars and conduits. Wattage rating of common electrical equipment." }
    ]
  },
  {
    code: "ECE 4109",
    name: "Power System",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Basic Concepts", detail: "Inductance and Capacitance of overhead power lines, Line representation- equivalent circuit of short, medium and long line. Network representation: single line and reactance diagram of power system and per unit representation." },
      { title: "Load Flow Studies", detail: "Gauss-Seidel and Newton-Raphson method. Control of voltage, real and reactive power, reactive power compensation." },
      { title: "Fault Analysis", detail: "Symmetrical fault calculation, symmetrical components, sequence impedance and sequence networks, different unsymmetrical fault calculation, stability analysis." }
    ]
  },
  {
    code: "MTE 4117",
    name: "Control System and Robotics",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introductory Concepts", detail: "Open loop versus closed loop feedback system. Input output relationship. Transfer function. DC machine dynamics, performance criteria, sensitivity and accuracy. Analysis of control systems time and frequency domain error constants." },
      { title: "Stability of control system", detail: "Routh-Hurwitz criterion, bode plot, polar plot. Nyquist method. Root locus techniques. Frequency response analysis. Nicholes chart, compensation. Introduction to non-linear control system. State variable characterization of systems, transition matrix, cano nical forms. Controllability and observability, PI, PD and PID controller." },
      { title: "Robotics", detail: "Definition, Scope and Trends of robotics, Classification of robots, Spatial descriptions and transformations, Kinematics of manipulators, Trajectory generation, Dynamics and Control of manipulators, Actuators and sensors for manipulators, Programming lan guages for robots, Mobile robots, Multi-robot systems Industrial robots, Service robots, Human-Robot Interaction, Social Robotics." }
    ]
  },
  {
    code: "MTE 4118",
    name: "Control System and Robotics Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course MTE 4117." }
    ]
  },
  {
    code: "ECE 4123",
    name: "Digital Signal Processing",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction", detail: "Signals, systems and signal processing, classification of signals, the concept of frequency in continuous time and discrete time signals, analog to digital and digital to analog conversion, Sampling and quantization." },
      { title: "Discrete time signals and systems", detail: "Discrete time signals, discrete time systems, analysis of discrete time linear time invariant systems. Discrete time systems described by difference equations, implementation of discrete time systems, correlation and convolution of discrete time signals." },
      { title: "The z-transform", detail: "Introduction, definition of the z-transform, z-transform and ROC of infinite duration sequence, properties of z-transform inversion of the z-transform, the one-sided z-transform." },
      { title: "Frequency analysis of signals and systems", detail: "Frequency analysis of continuous time signals, Frequency analysis of Discrete time signals, Properties of Fourier transform of discrete time signals, Frequency domain characteristics of linear time invariant system, linear time invariant systems as frequency selective filters, Inverse systems and deconvolution." },
      { title: "Discrete Fourier Transform (DFT)", detail: "Discrete Fourier series (DFS), Properties of DFS, Discrete Fourier Transformation (DFT), Properties and application of DFT." },
      { title: "Fast Fourier Transform Algorithms", detail: "FFT algorithms, applications of FFT algorithm." },
      { title: "Digital Filter Design Techniques", detail: "Differential and difference equations, Digital Transfer Functions, frequency response, Digital filter realization scheme, Finite Impulse response (FIR) Infinite Impulse Response (IIR) filter design." },
      { title: "Application of DSP", detail: "Speech processing, analysis and coding, Matlab application to DSP" }
    ]
  },
  {
    code: "ECE 4124",
    name: "Digital Signal Processing Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4123." }
    ]
  },
  {
    code: "ECE 4000",
    name: "Thesis/Project-I",
    credits: 1.0,
    semester: "4-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "A project/thesis course will be assigned to the students in 4th year odd semester class and it will continue till 4th year even semester. The objective is to provide an opportunity to the students to develop initiative, creative ability, confidence and precise engineering judgment. The results of the work should be submitted in the form of a dissertation, which should include appropriate drawings, charts, tables, references etc. No grade shall be awarded for this course in 4th year odd semester. Final assessment on this course will be done in 4th year even semester." }
    ]
  },
  {
    code: "ECE 4100",
    name: "Industrial Training",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Practical knowledge about industries that includes organizational structure, workflow, policies, rules and regulations, social responsibility, project management, team work, etc." }
    ]
  },
  {
    code: "ECE 4122",
    name: "Seminar",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Practical knowledge about industries that includes organizational structure, workflow, policies, rules and regulations, social responsibility, project management, team work, etc." }
    ]
  },
  {
    code: "ECE 4111",
    name: "Digital Communication",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Communication channels, mathematical model and characteristics. Probability and stochastic process." },
      { title: "Source coding", detail: "Mathematical models of information, entropy, Huffman code and linear predictive coding." },
      { title: "Digital transmission system", detail: "Base band digital transmission, inter-symbol interference, bandwidth, power efficiency, modulation and coding trade-off." },
      { title: "Receiver for AWGN channels", detail: "Correlation demodulator and maximum like hood receiver." },
      { title: "Channel capacity and coding", detail: "Channel models and capacities and random selection of codes." },
      { title: "Block codes and conventional codes", detail: "Linear block codes, convolution codes and coded modulation. Spread spectrum signals and system." }
    ]
  },
  {
    code: "ECE 4112",
    name: "Digital Communication Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4111." }
    ]
  },
  {
    code: "ECE 4115",
    name: "Antennas & Propagation",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Fundamental of Antennas", detail: "Vector Potential Functions, Electric and Magnetic Fields for Electric and Magnetic Current Sources, Solution of Vector Potential Wave Equation." },
      { title: "Antenna Arrays", detail: "Two-Element Array, N-element Linear Arrays: Broad-side, End- fire, Phased, Binomial, Dolph-Tchebyschef and Super-directive Arrays, Determination of Array Factor and Patterns, Planar and Circular Arrays. Travelling-" },
      { title: "Wave and Broad-band Antennas", detail: "Long wire, V , Rhombic and Helical Antennas, Yagi, Uda array, Frequency Independent and Log-periodic Antennas." },
      { title: "Perture, Reflector and Lens Antennas", detail: "Huygens's Principle, Rectangular and Circular Apertures, Microstrip Antennas, Babinet's Principle, Sectoral, Pyramidal and Conical Horns, Parabolic and Cassegrain Reflector Antennas, Lens Antennas." },
      { title: "Antenna Measurement", detail: "Antenna ranges, Radiation Pattern, G ain. And Directivity, Polarization" },
      { title: "Radio wave propagation", detail: "Ground wave propagation, Ionospheric propagation, Propagation losses." }
    ]
  },
  {
    code: "ECE 4116",
    name: "Antennas & Propagation Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4115." }
    ]
  },
  {
    code: "ECE 4117",
    name: "Radar and Satellite Communication",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Radar", detail: "Introduction to Radar, Radar Equation CZ, Operating Principle of Radar with Block Diagram, CW and FM Radar, Tracking Radar, Antennas for Radar, Radar Receivers, Radar Transmitting System, Duplexer, and Usable Frequencies for Radar, Radar Applications." },
      { title: "Satellite Communication", detail: "Overview of Satellite System Engineering. Spacecraft, Introduction, to Spacecraft Subsystem. (AOCS), Telemetry, Tracking and command (TT & C). Spacecraft Antennas, Basic Antenna Types and Relationships Spacecraft, Antennas in Practice, Frequency Reuse Equ ipment Reliability and Space Qualification, Reliability redundancy. Multiple Access." },
      { title: "Earth station Technology", detail: "Earth Station Design, Earth Station Design for Low System Noise Temperature, Large Earth Station Antennas. Satellite Television Broadcasting Networks, VSAT technology." }
    ]
  },
  {
    code: "ECE 4118",
    name: "Radar and Satellite Communication Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4117." }
    ]
  },
  {
    code: "ECE 4125",
    name: "Radio & TV Engineering",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Introduction to radio communication, History, Frequency management. Design of radio transmitter and receiver circuits using scattering-parameter methods. Circuits include oscillators, radio frequency amplifiers and matching networks, mixers and detectors. Design of amplitude, frequency, and pulse-modulated communication systems, including modulators, detectors, and the effects of noise." },
      { title: "Television", detail: "Introduction, principle of operation, transmitter and receiver, Receiving and transmitting antenna. Camera tube, Picture tube, Electron beam scanning, T-lines, balun, duplexer, Vestigial side-band filters. Introduction to color TV, VCR, CCTV, CATV, MATV, TV Booster." }
    ]
  },
  {
    code: "ECE 4126",
    name: "Radio & TV Engineering Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4125." }
    ]
  },
  {
    code: "ECE 4141",
    name: "Fiber Optic Communication",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Historical perspective, basic system, nature of light, advantages and applications of fiber optic." },
      { title: "Optics review", detail: "Ray theory and applications, lenses, imaging, numerical aperture, diffraction." },
      { title: "Light wave fundamentals", detail: "Electro magnetive waves, Dispersion, polarization, resonant cavities, reflection at plane boundary, critical angle. Integrated optic waveguides: Slab waveguide, Modes in symmetric and asymmetric waveguide, coupling, Dispersion and distortion, integrated optic components." },
      { title: "Optic fiber waveguide", detail: "Step index fiber, graded index fiber, attenuation, pulse distortion and information rate, construction of optic fiber, optic fiber cables. Light sources: LED, LD, distributed feedback LD, optical amplifiers, fiber laser, vertical cavity surface emitting laser diode." },
      { title: "Light detectors", detail: "Photo detection, photo multiplier, semiconductor photodiode, PIN photodiode, avalanche photodiode." },
      { title: "Couplers and connectors", detail: "Connector principle, end preparation, splices, connectors, source coupling." },
      { title: "Network distribution and fiber components", detail: "Directional couplers, star couplers, switches, isolator, wave-length division multiplexing, fiber bragg grating." },
      { title: "Modulation", detail: "LED modulation, LD modulation, Analogue and digital modulation, modulation formats, optic heterodyne receivers." },
      { title: "Noise and detection", detail: "Thermal shot and noise, SNR, error rates, receiver circuit design. System design: Analogue and digital system design, few real-life problems and examples." }
    ]
  },
  {
    code: "ECE 4142",
    name: "Fiber Optic Communication Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4141." }
    ]
  },
  {
    code: "ECE 4143",
    name: "Biomedical Engineering",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Medical Terminology, Cell Physiology, Membrane Potential, Action Potential, Rhythmic Excitation of Heart. Transducers used in Medical Diagnostics." },
      { title: "Biomedical Instrumentation", detail: "Normal Electrocardiograph, ECG Simulator, Watch Filter, ECG Amplifier, Pulse Beat Monitor, Pace Maker, Galvanic Skin Resistance Detector, Respiratory and Suction Apparatus. Electronic Stethoscope. Electronic Clinical Thermometer, Blood Flow and Pressure Monitoring Recorders, Metabolic Rate Measurement." },
      { title: "Special topics", detail: "Bio-telemetry, Application of Ultrasonic and Laser in Biology and Medicine, Clinical X-ray Equipment. Fluoroscopy, Infrared Heating." }
    ]
  },
  {
    code: "ECE 4144",
    name: "Biomedical Engineering Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4143." }
    ]
  },
  {
    code: "ECE 4127",
    name: "VLSI Design",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "VLSI Design Methodology", detail: "Top-down design approach, technology trends." },
      { title: "MOS Technology", detail: "Introduction to Microelectronics and MOS Technology, Basic Electrical Properties and Circuit Design Processes of MOS and Bi CMOS Circuits, MOS, NMOS, CMOS inverters, pass transistor and pass gates, DC and transient characteristics." },
      { title: "Overview of Fabrication Process", detail: "NMOS, PMOS, CMOS, Bi-CMOS process." },
      { title: "NMOS and CMOS Layout", detail: "Color plate Stick diagram, and design rules." },
      { title: "CMOS circuit characteristics", detail: "Resistance and capacitance, rise and fall time, power estimation." },
      { title: "Introduction to Bi-CMOS Circuits", detail: "Shifter, an ALU Sub-System, adder, counter, multipliers, multiplexer. Data Path and memory structures, Buffer circuit design, DCVS Logic." },
      { title: "Design and Test-Ability", detail: "Circuit partitioning, Floor planning and placement, Routing, Practical Aspects of Design Tools and Test-Ability MOS Design, Behavioral Description, Structural Description, Physical Description and Design Verification." }
    ]
  },
  {
    code: "ECE 4128",
    name: "VLSI Design Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4127." }
    ]
  },
  {
    code: "ECE 4129",
    name: "Network Planning",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Network components, Theoretical network, Real world networks." },
      { title: "Network Architectural Design", detail: "Designing the LAN, Configuring the network server and client, Network administration, Remote access, expanding the network, Wide area network troubleshooting, major protocol suites." },
      { title: "Network Simulation", detail: "Network simulation and optimization, Network operations, control and maintenance, Network administration, Network management database and tools, Capacity planning." },
      { title: "Network Optimization", detail: "Network security and integrity, linear programming and network algorithms for planning, Reliability theory and network planning." }
    ]
  },
  {
    code: "ECE 4130",
    name: "Network Planning Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4129." }
    ]
  },
  {
    code: "ECE 4131",
    name: "Wireless Network",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction to Wireless Networks", detail: "wireless access networks-wireless mesh networks, personal area networks (wireless sensor networks, body area networks, Low Pan, and Bluetooth), wireless and mobile ad hoc networks, challenged networks (DTNs, VANETs)." },
      { title: "Wireless MAC Protocols", detail: "IEEE 802.11, IEEE 802.11e, IEEE 802.11n, IEEE 802.11s, IEEE 802.15.4, S-MAC, B-MAC, IEEE 802.22/20, IEEE 802.16d/e." },
      { title: "Wireless Routing", detail: "routing matrix-ETX, ETT, WCETT, Air Time Metric, routing protocols-AODV, DSR, DSDV, HWMP, sensor network routing, VANET routing etc." },
      { title: "Others", detail: "Wireless Transport protocols, Wireless TCP and its variants, Hop by Hop Congestion Control, Rate based Congestion Control etc. Quality of Service in Wireless Networks." }
    ]
  },
  {
    code: "ECE 4132",
    name: "Wireless Network Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4131." }
    ]
  },
  {
    code: "ECE 4133",
    name: "Artificial Intelligence",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Fundamental", detail: "Definition of AI, historical development of AI, application of AI." },
      { title: "Production Systems", detail: "Introduction of product system, production rules, the working memory, the control unit interpretation, conflict resolution strategies, alternative approach for conflict resolution, types of production systems, forward versus backward production systems, knowledge base optimization in a production system." },
      { title: "General Problem-Solving Approaches", detail: "Breadth first search, depth first search, iterative deepening search, hill climbing, simulated annealing, heuristic search, A* algorithm, adversary search, the minimax algorithm, constraint satisfaction problems." },
      { title: "Logic and Structural Knowledge Representation", detail: "Propositional logic, first-order logic, resolution principle, frames, semantic-nets, petri nets, relational data model." },
      { title: "Reasoning under Uncertainty", detail: "Bayesian reasoning, fuzzy knowledge, probability theory, Dempster-shafer theory, fuzzy set theory, expert systems." },
      { title: "Machine Learning and Natural Language Processing", detail: "Naive Bayes algorithm, syntactic semantics and pragmatic, top-down passing, bottom-up pursing, lexicon." }
    ]
  },
  {
    code: "ECE 4134",
    name: "Artificial Intelligence Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4133." }
    ]
  },
  {
    code: "ECE 4135",
    name: "Human Computer Interaction",
    credits: 3.0,
    semester: "4-1",
    type: "theory",
    optional: true,
    topics: [
      { title: "Process and Model", detail: "Introduction to Human-computer interaction (HCI), human information processing systems, Models of interaction, Approaches to HCI, User interface, HCI in software process, Cognitive models." },
      { title: "Issues and Requirements", detail: "Socio-organizational Issues and stakeholders Requirements, Communication and collaboration models, Task Analysis, Dialog notation and design, Groupware, CSCW and social issues." },
      { title: "User System Interaction", detail: "analysis and design, User interface design, Interface technique and technology, case studies." }
    ]
  },
  {
    code: "ECE 4136",
    name: "Human Computer Interaction Sessional",
    credits: 0.75,
    semester: "4-1",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4135." }
    ]
  },
  {
    code: "ECE 4209",
    name: "Power Station, Switchgear & Protection",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction to various power plants", detail: "Steam, hydro, gas, combined cycle, and nuclear power plants. Plant factor, load factor, diversity factor, load curve, chronological load curve, load duration curve. Base load and peak load, selection of units. Power plant economy." },
      { title: "Introduction to switchgear and protection", detail: "Fuse and Circuit breakers, principle of arc extinction in DC and AC circuit breakers. Recovery voltage, rate of rise of recovery voltage and other transient phenomena. Switching surges. Disconnection of unloaded transformer and transmission line. Speed of circuit b reaker. Construction, operation, rating and testing of bulk oil and minimum oil breaker, SF6 circuit breaker, ABCB, ACB, and VCB. Selection of circuit breaker. Travelling wave in transmission line. Surge absorber, lightning arrester, horn gap, its rating and testing." },
      { title: "Protective relaying", detail: "Relay voltage rating, high, medium and low. Basic protective zone. Relaying Scheme. Electromechanical Relays: Principal, general equation. Overcurrent, balanced current, overvoltage, distance, directional, positive sequence, negative sequence and differential relays and their applications." },
      { title: "Static relays", detail: "Introduction to solid state device in the construction of static relays. Different type of static relays." },
      { title: "Generator protection", detail: "Transformer protection, Bucholz's relay. Protection of bus bar, transmission line, feeder etc. Relay testing." }
    ]
  },
  {
    code: "ECE 4211",
    name: "Computer Networks",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Introduction", detail: "Definition, uses of computer networks, network topology, network media, network devices, different type of networks: LAN, MAN, WAN etc." },
      { title: "IP Addressing", detail: "Classification of IP addressing, subnet mask, CIDR, private IP Address, public IP address, sub netting, VLSM etc." },
      { title: "Network Model", detail: "OSI Reference Model, TCP/IT Reference Model, ATM Reference Model, functions of the layers of different models, Network Protocols working at different layers." },
      { title: "Data Link Layer Design Issues and Framing", detail: "Character count, byte stuffing, bit stuffing, error detection: cyclic redundancy check, parity bit checking and correction: Hamming code, windowing protocols: go back N ARQ, selective repeat ARQ, elementary data link protocols, high-level data link contro l, point to point protocol, the medium access control sub-layer." },
      { title: "Multiple Access", detail: "Random Access, ALOHA, CSMA, CSMA/CD, CSMA/CA, channelized access, CDMA, TDMA, FDMA, controlled access, reservation, poling, token passing, Ethernet, wireless LANs and Bluetooth." },
      { title: "Switching", detail: "Circuit switching, packet switching, message switching, routing algorithms, virtual circuit and datagram, congestion control algorithms, quality of service, internetworking, internetworking devices etc." },
      { title: "Network Layer Protocols", detail: "Address resolution protocol, internet protocol, internet control, message protocol, ipv6, routing information protocol, open shortest path first, border gateway protocol, user datagram protocol, transmission control protocol." },
      { title: "Network Security", detail: "Cyber-attacks, Cyber-ethics, Cryptography, substitution cipher, transposition cipher, one-time pads, public key cryptography, encryption and decryption, authentication protocol 1.0 to 5.0, digital signature, key distribution center, different symmetric key algorithm, certificate autho rity, DNS, electronic mail, world wide web." }
    ]
  },
  {
    code: "ECE 4212",
    name: "Computer Networks Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4211." }
    ]
  },
  {
    code: "ECE 4223",
    name: "Digital Image Processing",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: false,
    topics: [
      { title: "Digital Image Fundamentals", detail: "Different types of digital images, sampling and quantization, imaging geometry, image acquisition systems." },
      { title: "Bilevel Image Processing", detail: "Basic concepts of digital distances, distance transform, medial axis transforms, component labeling, thinning, morphological processing, extension to grey scale morphology." },
      { title: "Binarization of Grey level images", detail: "Histogram of grey level images, optimal thresholding using Bayesian classification, multilevel thresholding." },
      { title: "Detection of edges", detail: "First order and second order edge operators, multi-scale edge detection, Canny's edge detection algorithm, Hough transform for detecting lines and curves, edge linking." },
      { title: "Images Enhancement", detail: "Point processing, Spatial Filtering, Frequency domain filtering, multi-spectral image enhancement, image restoration." },
      { title: "Image Segmentation", detail: "Segmentation of grey level images, Water shade algorithm for segmenting grey level image. Image representation and description, recognition and interpretation." },
      { title: "Image compression", detail: "Lossy and lossless compression schemes, prediction-based compression schemes, vector quantization, sub-band encoding schemes, JPEG compression standard, Fractal compression scheme, Wavelet compression scheme." }
    ]
  },
  {
    code: "ECE 4224",
    name: "Digital Image Processing Sessional",
    credits: 1.5,
    semester: "4-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4223." }
    ]
  },
  {
    code: "ECE 4000",
    name: "Thesis/Project-II",
    credits: 3.0,
    semester: "4-2",
    type: "sessional",
    optional: false,
    topics: [
      { title: "Overview", detail: "The objective is to provide an opportunity to the students to develop initiative, creative ability, confidence and precise engineering judgment. The results of the work should be submitted in the form of a dissertation, which should include appropriate drawings, charts, tables, references etc." }
    ]
  },
  {
    code: "ECE 4221",
    name: "Unix Programming",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Introduction to Unix Programming." },
      { title: "Unix Environment", detail: "command line, globbing, I/O redirection, piping, Basic commands, Memory layout." },
      { title: "Debugging", detail: "GDB, valgrind, essential x86, Fork, exec, wait, Process status, bit manipulation, sending signals Unix I/O Implementing I/O redirection, piping Directories and files. Walking a directory tree, exploring attributes. Implementing ls-l. Permissions, file owner / group, time-stamps. Signals and signal handling Design / implementation of sleep Process Relations hips Backgrounding. Popen/ pclose Midterm Terminal handling Review midterm Networking Client / Server. I/O multiplexing." },
      { title: "Multi-threading", detail: "basics, mutual exclusion Multi-threading: bounded buffers, condition variables Multi-threading: deadlocks Non-blocking I/O. Regular expressions. Sys V IPC. Semaphores and shared memory. Shell scripting" }
    ]
  },
  {
    code: "ECE 4222",
    name: "Unix Programming Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4221" }
    ]
  },
  {
    code: "ECE 4227",
    name: "Network Security",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Network security policies, strategies and guidelines, Network security assessments and matrices," },
      { title: "Different attacks", detail: "Denial of Service attack (DoS), Distributed Denial of Service (DDoS) attack, Eavesdropping, IP spoofing, Sybil attack, Blackhole attack, Grayhole attack, Man-in-the-middle attack, Passwords-based offline attacks," },
      { title: "Network security threats and attackers", detail: "Intruders, Malicious software, Viruses and Spy-ware, Security standards: DES, RSA, DHA, Digital Signature Algorithm (DSA), SHA, AES, Security at" },
      { title: "Transport layer", detail: "Secure Socket Layer (SSL) and Transport Layer Security (TLS)," },
      { title: "Security on Network layer", detail: "IPSec, Network security applications: AAA standards, e-mail securities, PGP, S/MIME, PKI smart cards, Sandboxing, Firewalls and Proxy server," },
      { title: "Security for wireless network protocols", detail: "WEP, WPA, TKIP, EAP, LEAP, Security protocols for Ad-hoc network, Security protocols for Sensor network, Security for communication protocols, Security for operating system and mobile agents, Security for e-commerce, Security for LAN and WAN, Switching an d routing security, Other state of-the-art related topics." }
    ]
  },
  {
    code: "ECE 4228",
    name: "Network Security Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4227" }
    ]
  },
  {
    code: "ECE 4237",
    name: "Parallel and Distributed Processing",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Multithreaded computing", detail: "Basic concepts: processes, threads, scheduling," },
      { title: "Multithreaded programming, Thread synchronization", detail: "semaphores, locks, monitors, Concurrency issues: deadlock, starvation, Multi-core computers." },
      { title: "Networked computers", detail: "Basic concepts: client-server, connections, datagrams, Application protocol design, Clientside socket programming, Server-side socket programming, Datagram programming." },
      { title: "Network protocols and security", detail: "Physical/data link/network/transport/application layers, Network security." },
      { title: "Distributed systems", detail: "Architectures : Two-tier, multi-tier, peer-to-peer, many-to- many, Middleware: distributed objects, web services." },
      { title: "Parallel computing", detail: "Architectures : SMP, cluster, hybrid, grid, GPGPU," },
      { title: "Middleware", detail: "OpenMP, MPI, grid Middleware." }
    ]
  },
  {
    code: "ECE 4238",
    name: "Parallel and Distributed Processing Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4237." }
    ]
  },
  {
    code: "ECE 4239",
    name: "Computer Graphics and Animations",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "History, Application of Computer Graphics (Computer Aided Design Animation), A Survey of Graphics I/O Devices and Types." },
      { title: "Graphics Software Design", detail: "Survey of Desired Function, Toward a Universal Graphic Language. Display Files, Databases for Pictorial Applications." },
      { title: "Graphics Techniques", detail: "Point-Plotting Techniques, Line Drawing, Geometric Transformations, Windowing and Clipping, Raster Graphics." },
      { title: "Hardware for Computer Graphics", detail: "Typical Small and Large System, Graphic Terminals, Plotters, Graphic Display Processors, Device Independent Graphics Systems." },
      { title: "Graphics Software", detail: "A Simple Graphic Package, Segmented Display Files, Geometric Models, Picture Structure." },
      { title: "Interactive Graphics", detail: "Input Techniques, Event Handling, Three-Dimensional Graphics, Curves and Surfaces, 3-D Transformation." },
      { title: "Hidden Surface Problem", detail: "Back Face Removal, Hidden-Line Removal Curved Surfaces, Describing Points, Lines and Polygons, Some Hints for Building Polygonal Models, Color Perception, RGBA and Color Index Mode, Dithering, Blending, 3-D Blending with The Depth Buffer, Antialiasing, Fog, Fog Equations, The OpenGL ARB." },
      { title: "API Specifies", detail: "Data Types, Function Naming Conventions, Platform Independence, Drawing Shapes with OpenGL, Animation with OpenGL and GLUT." },
      { title: "Drawing in Space", detail: "Lines, Points and Polygons." },
      { title: "Co-ordinate Transformations", detail: "Understanding Transformations, Matrix Munching Projections, Matrix Manipulation Color Lighting and Materials, Texture Mapping." }
    ]
  },
  {
    code: "ECE 4240",
    name: "Computer Graphics and Animations Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4239" }
    ]
  },
  {
    code: "ECE 4241",
    name: "Computer Vision",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Introduction to Computer Vision, Case study-Face Recognition, Linear Algebra/Probability Review." },
      { title: "Image Structure", detail: "Linear Filters, Finding Lines-From Detection to Model Fitting," },
      { title: "Clustering and Segmentation. Camera Models", detail: "Camera Models, Camera Calibration, Epipolar Geometry, Stereo & Multi-view Reconstruction." },
      { title: "Recognition (Building blocks)", detail: "Detectors and Descriptors, SIFT & Single Object Recognition, Optical Flow & Tracking." },
      { title: "Recognition (Objects, Scenes, and Activities)", detail: "Introduction to Object Recognition and Bag-of-Words Models, Object classification and detection- a part- based generative model (Constellation model), Object Classification and" },
      { title: "Detection", detail: "a Part-based Discriminative Model (Latent SVM), Human Motion Recognition." },
      { title: "Computer Vision", detail: "State-of-the-art and the Future." }
    ]
  },
  {
    code: "ECE 4242",
    name: "Computer Vision Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4241" }
    ]
  },
  {
    code: "ECE 4243",
    name: "Data Mining",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Data Mining and Applications", detail: "Relational Databases, Data Warehouses, Transactional Databases, Advanced Data and Information Systems, Characterization and Discrimination, Mining Frequent Patterns, Associations, and Correlations, Classification and Prediction, Cluster Analysis, Outlier Analysis, Evolution Analysis." },
      { title: "Data Preprocessing", detail: "Descriptive Data Summarization, Data Cleaning, Data Integration and Transformation, Data Reduction, Data Discretization and Concept Hierarchy Generation." },
      { title: "Classification, Clustering and Prediction", detail: "Classification by Decision Tree Induction, Bayesian Classification, Rule-Based Classification, Classification by Back propagation, Support Vector Machines, Clustering by Partitioning/ Hierarchical/ Density-based/ Grid-based/ Model-based methods, Clustering High-Dimensional Data, Outlier analysis, Prediction, Linear Regression, Nonlinear Regression, Other Regression-Based Methods of prediction, Evaluating the Accuracy and error measures of a Classifier or Predictor." },
      { title: "Web Mining", detail: "Anatomy of a search engine, Crawling the web, Web Graph Analysis, Extracting structured data from the web, classification and vertical search, Web Log Analysis." },
      { title: "Advanced Analysis", detail: "Mining Stream, Time-Series, and Sequence Data, Graph Mining, Social Network Analysis, and Multi-relational data mining, Mining objects, Spatial, Multimedia, and Text Data." }
    ]
  },
  {
    code: "ECE 4244",
    name: "Data Mining Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4243." }
    ]
  },
  {
    code: "ECE 4245",
    name: "Machine Learning",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction to machine learning", detail: "Machine learning fundamentals, Logistic regression, linear regression Supervised and unsupervised classification, Performance evaluation techniques, bias-variance tradeoff, Applications of machine learning." },
      { title: "Machine Learning and Natural Language Processing", detail: "Naive Bayes algorithm, SVM, syntactic semantics and pragmatic analysis, top-down parsing, bottom-up parsing, lexicon analysis." },
      { title: "Concept of Neural Network", detail: "Introduction Human Brain Mechanism, Neural Machine Intelligence, Basic models of artificial neuron, activation function, network architecture, neural network viewed as directed graph, Basic learning rules, overview of perceptron, Single layer of perceptron, mathematical model of single layer perceptron, perceptron learning algorithm, Delta learning rule, Multi-layer perceptron, Back propagation learning algorithm, mathematical model of MLP network." },
      { title: "Fuzzy System & Defuzzification", detail: "Introduction to Fuzzy system, Fuzzy relations, fuzzy numbers, Linguistic description and their analytical form, fuzzy control, Defuzzification Methods, Applications, Concept of Neuro-Fuzzy and Neuro-GA Network." },
      { title: "Genetic Algorithm", detail: "Basic Concepts, Offspring, Encoding, Reproduction, Crossover, Mutation Operator, Application of GA." }
    ]
  },
  {
    code: "ECE 4246",
    name: "Machine Learning Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4245" }
    ]
  },
  {
    code: "ECE 4247",
    name: "Computer Aided Instrumentations",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Methods of measurement. Statistical method applied to field of measurement and error analysis and calibration." },
      { title: "Resistance, Inductance and Capacitance measurements", detail: "Different methods of measuring high, medium and low resistances. Methods of measuring self and mutual inductance and capacitance measurement. A.C. and DC bridge methods, Measurement of insulation and earth resistances. Localization of cable fault." },
      { title: "Magnetic measurement", detail: "Flux meter, Flux and Flux density measurement. Determination of iron losses and their separation." },
      { title: "Measuring instruments", detail: "Classification of measuring instruments. Ammeter, Voltmeter, wattmeter, AVO meter, Energy meter, Ampere-hour meter and Maximum demand meter for measuring AC and DC quantities. Speed, frequency and phase difference measurements. Illumination measurement." },
      { title: "Electronic measuring instruments", detail: "Digital instruments, VTVM, Q-meter and CRO." },
      { title: "Instrumentation", detail: "Extension of instrument range. Use of C.T. and P.T and calculation of their burden, Instrumentation of substation." },
      { title: "Measurement of non-electrical quantities", detail: "Transducer. Measurement of temperature, pressure, displacement, velocity, acceleration. Strain gauge and their applications." }
    ]
  },
  {
    code: "ECE 4248",
    name: "Computer Aided Instrumentations Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4247" }
    ]
  },
  {
    code: "ECE 4249",
    name: "Computer Aided Power System Design",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Network Matrices", detail: "Evaluation of Bus Admittance matrix (YUS), Bus Impedance matrix (ZBUS), Branch Impedance matrix (ZBT) and Loop Admittance matrix (ZLOOP) by singular and non-singular transformation using computer system." },
      { title: "Short Circuit Studies", detail: "Formulation of ZBUS for single phase and three phase networks, transformation of network matrices using symmetrical components, short circuit studies using computer." },
      { title: "Load Flow Studies", detail: "Representation of off load and on load tap changing and phase shifting transformer and dc link with computer tools, decoupled and fast decoupled methods, sparsity technique, introduction to load flow of integrated ac/dc/system." },
      { title: "Stability Studies", detail: "Network formulation for stability studies for different types of loads (constant impedance, constant current and constant power loads), digital computer solution of swing equation for single and multi-machine cases using Runge-Kutta and predictor correcto r method, effect of exciter and governor on transient stability." }
    ]
  },
  {
    code: "ECE 4250",
    name: "Computer Aided Power System Design Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4249." }
    ]
  },
  {
    code: "ECE 4251",
    name: "Renewable Energy",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Importance of renewable energy, sources. Statistics regarding solar radiation and wind speed." },
      { title: "Insulation", detail: "Geographical distribution, atmospheric factors, measurements." },
      { title: "Solar cell", detail: "Principle of operation, spectral response, factors affecting conversion efficiency, I-V characteristics, maximum power output." },
      { title: "PV modules and arrays", detail: "Stationery and tracking." },
      { title: "PV systems", detail: "Stand alone, battery storage, inverter interfaces with grid." },
      { title: "Wind turbine generators", detail: "Types, operational characteristics, cut-in and cut-out speed, control, grid interfacings, AC-DC-AC link. Wind and Tidal energy conversion." },
      { title: "Other Non-conventional Energy Options", detail: "Geothermal, OTEC, Wave energy, Biomass, MHD, Chemical energy, Fuel cell, Nuclear fusion." }
    ]
  },
  {
    code: "ECE 4252",
    name: "Renewable Energy Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4251." }
    ]
  },
  {
    code: "ECE 4253",
    name: "Microwave Engineering",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "UHF Transmission Lines", detail: "Voltage and current in ideal transmission lines, reflection, transmission, standing wave, impedance transformation, smith chart, impedance matching and lossy transmission lines." },
      { title: "Microwave Components", detail: "Cavities, Slow wave structures, Waveguide Tees, Directional Couplers, Circulators and Isolators, S-parameter." },
      { title: "Microwave Tubes", detail: "Klystron amplifier, multicavity klystron amplifier, Reflex Klystron oscillator, magnetron, TWT amplifier, BWO. Semiconductor microwave devices: Tunnel diodes, Gunn-Effect diodes, IMPATT diodes. Microwave measurements." }
    ]
  },
  {
    code: "ECE 4254",
    name: "Microwave Engineering Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4253." }
    ]
  },
  {
    code: "ECE 4255",
    name: "Power System Operation & Control",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Introduction", detail: "Design and constructional features of overhead power transmission lines and underground cables. DC and AC power distribution. Stability: Swing equation, power angle equation, equal area criterion, multi-machine system, step-by-step solution of swing equation, factors affecting transient stability. Flexible AC transmission system. High voltage DC transmission system. Power system harmonics." },
      { title: "Principles of Power System Operation", detail: "SCADA, convention and competitive environment. Unit commitment, static security analysis, state estimation, optimal power flow, automatic generation control and dynamic security analysis." }
    ]
  },
  {
    code: "ECE 4256",
    name: "Power System Operation & Control Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4255." }
    ]
  },
  {
    code: "ECE 4257",
    name: "High Voltage Engineering",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Ionization and decay process", detail: "Townsend's first and second ionization coefficient. Electric breakdown in gases. Townsend's criterion for spark breakdown. Sparking potential. Penning effect. Corona discharges, power loss calculation. Breakdown of solid and liquid dielectrics." },
      { title: "Generation of high voltage", detail: "Alternating voltage, transformer cascade. Series resonant circuit for high voltage ac testing. Test of dc and ac cable." },
      { title: "Transient Voltage", detail: "Impulse wave shape. Impulse voltage generator and its mathematical analysis. Design consideration of impulse generators. Triggering of impulse generators." },
      { title: "DC Operation", detail: "DC voltage doubler and cascade circuits. Electrostatic generator, voltage stabilization. Measurement of high voltage. Electrostatic voltmeter, sphere gap. Potential divider. High Voltage testing of power system equipment. Oil testing. Design consideratio n of transmission line based on direct stroke. High voltage transient in transmission line. High voltage lightning arrester. Insulation co-ordination." }
    ]
  },
  {
    code: "ECE 4258",
    name: "High Voltage Engineering Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4257." }
    ]
  },
  {
    code: "ECE 4259",
    name: "System Simulation and Modeling",
    credits: 3.0,
    semester: "4-2",
    type: "theory",
    optional: true,
    topics: [
      { title: "Simulation modeling basics", detail: "systems, models and simulation, Classification of simulation models, Steps in a simulation study." },
      { title: "Concepts in discrete-event simulation", detail: "event-scheduling vs. process-interaction approaches, time-advance mechanism, organization of a discrete-event simulation model, Continuous simulation models, Co 3mbined discreet continuous models, Monte Carlo simulation, Simulation of queuing systems." },
      { title: "Building valid and credible simulation models", detail: "validation principles and techniques, statistical procedures for comparing real-world observations and simulated outputs, input modeling, Generating random numbers and random variates, Output analysis. Simulation languages, Analysis and modeling of some practical systems." }
    ]
  },
  {
    code: "ECE 4260",
    name: "System Simulation and Modeling Sessional",
    credits: 0.75,
    semester: "4-2",
    type: "sessional",
    optional: true,
    topics: [
      { title: "Overview", detail: "Sessional based on the theory of course ECE 4259." }
    ]
  }
];
