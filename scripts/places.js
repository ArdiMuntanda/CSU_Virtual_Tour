class Place {
    constructor(id, location) {
        this.id = id;
        this.title;
        this.location = location;
        this.heading;
        this.pitch;
        this.description = ""; 
        this.audio = ""; 

        if (id == 0) {
            this.prev = null; 
            this.next = 1; 
        } else if (id == 28) {
            this.prev = this.id - 1; 
            this.next = null; 
        } else {
            this.next = this.id + 1; 
            this.prev = this.id - 1; 
        }
    }
    setTile(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description; 
    }

    setPov(pov) {
        this.heading = pov.heading;
        this.pitch = pov.pitch;
    }
}
const places= [
    {lat: 35.324585468807385, lng: 33.34469145172765},//University entrance
    {lat: 35.32489964864276, lng: 33.345011686579284},//offices
    {lat: 35.324866901686, lng: 33.345090703741},//finance
    {lat: 35.324719970045, lng: 33.345210042685},//international office
    {lat: 35.324716824749, lng: 33.345263458965},//inside international office
    {lat: 35.325033283695404, lng: 33.34501314218982},//block A entrance
    {lat: 35.325076616026, lng: 33.344886072863},//block a corridor
    {lat: 35.325116446837, lng: 33.344921866537},//class room block a level 0
    {lat: 35.325183254884, lng: 33.344817385591},// electronic lab
    {lat: 35.325151598335, lng: 33.344871856449},//mechatronic lab
    {lat: 35.324970905215, lng: 33.344738256126},//computer lab
    {lat: 35.324946756922, lng: 33.344725224214},//chemestry lab
    {lat: 35.324989732429, lng: 33.344713892219},//international dean office
    {lat: 35.325179985013, lng: 33.344699874222},// second level Class rooms block a
    {lat: 35.325095487215, lng: 33.344722557636},// conference hall
    {lat: 35.325059305927, lng: 33.344752658573},// inside kinesitherapie lab
    {lat: 35.32521969187, lng: 33.344857142322},//kids room
    {lat: 35.325002171725, lng: 33.344658787157},// level 1 class with smart board and projector
    {lat: 35.32497277057118, lng: 33.34512625162393},//block b
    {lat: 35.32522725503857, lng: 33.345205625084134},//theater
    {lat: 35.3252800305814, lng: 33.345325498578916},//minigolf and chess area
    {lat: 35.32545696971763, lng: 33.34508378208661},//basketball court 
    {lat: 35.32510498715317, lng: 33.345445200677375},//orange cafe
    {lat: 35.324890815826, lng: 33.345356054157},
    {lat: 35.325007070754, lng: 33.34537524744},//cafetaria booling 
    {lat: 35.324887764107, lng: 33.345392115824},//library
    {lat: 35.324715736982505, lng: 33.345013570310556},//parking
];
const descriptionList = [
    "The Main Entrance of Cyprus Science University welcomes visitors with a striking sight. Two tall columns proudly stand at the entrance, adorned with the university logo. These imposing columns, flanking the entrance, serve as a symbolic representation of the institution's values and aspirations. The university logo prominently displayed on the columns signifies the commitment to excellence and serves as a beacon for knowledge seekers entering this prestigious institution.",

    "Welcome to the Administration Building, the nerve center of Cyprus Science University. This architectural marvel reflects the institution's commitment to professionalism and effective management. Within these walls, faculty and administrative staff work diligently to ensure the smooth functioning of the university. Take a moment to appreciate the contemporary design and efficient layout that facilitate the university's mission of providing a world-class education.",

    "The Finance Office is a vital administrative hub within Cyprus Science University. This office handles financial matters related to tuition, fees, and student accounts. Dedicated staff members are available to provide assistance and guidance on financial transactions, scholarships, and financial aid programs. Visit the Finance Office to ensure smooth financial management throughout your academic journey.",

    "Enter the International Office, a gateway to global opportunities within Cyprus Science University. This welcoming space provides comprehensive support and guidance to international students. Knowledgeable staff members are available to assist with visa support, cultural integration, academic counselling, and student exchange programs. Embrace the university's commitment to diversity as you witness the collaborative efforts to ensure a seamless transition and enriching experience for international students.",
    
    "Knowledgeable staff members are available to assist with visa support, cultural integration, academic counselling, and student exchange programs. Embrace the university's commitment to diversity as you witness the collaborative efforts to ensure a seamless transition and enriching experience for international students. ",

    "The entrance to Block A welcomes you to a world of academic exploration within Cyprus Science University. As you step through the entrance, you are greeted by the distinct architecture and design of this building. The entrance sets the tone for a productive learning environment, inviting you to enter and engage with the various educational resources and facilities housed within Block A.",

    "The Block A Corridor serves as a bustling passageway connecting different departments and classrooms within Cyprus Science University. As you traverse this corridor, you'll witness the vibrant energy of students and faculty moving between classes, engaging in discussions, and collaborating on projects. The corridor is lined with bulletin boards displaying announcements and information relevant to academic pursuits.",

    "Step into a Lecture Room within Cyprus Science University, where knowledge is shared and ideas come to life. Designed to foster an optimal learning environment, these rooms feature comfortable seating, ample desk space, and state-of-the-art audiovisual technology. As you take your seat, prepare to engage in interactive lectures, discussions, and debates. Immerse yourself in the academic atmosphere as you absorb the wealth of knowledge and insights shared within these walls.",

    "Welcome to the Electronic Laboratory, a cutting-edge facility within Cyprus Science University. This specialized lab is designed to facilitate hands-on learning and experimentation in the field of electronics. Equipped with advanced electronic components, measurement instruments, and circuitry tools, this lab provides students with the opportunity to design, build, and test electronic systems and circuits. Explore this state-of-the-art facility and witness the intricate workstations and specialized equipment that empower students to delve into the realm of electronics and innovation.",

    "Welcome to the Mechatronic Lab, a cutting-edge facility within Cyprus Science University. Here, students dive into the fascinating world of mechatronics, an interdisciplinary field merging mechanics, electronics, and computer science. Witness the array of advanced machinery, robotics equipment, and tools that enable hands-on exploration and innovation. This is where students design, build, and test groundbreaking projects, pushing the boundaries of technology and engineering.",

    "Enter the Computer Lab, a hub of technological prowess within Cyprus Science University. Equipped with high-end computers and the latest software, this lab caters to students pursuing computer-related disciplines. Engage in programming, coding, and digital experimentation as you harness the power of technology for academic pursuits. Whether you're a budding software developer or a curious tech enthusiast, this space offers an environment primed for innovation and learning.",

    "Welcome to the Chemistry Laboratory, a space dedicated to scientific exploration and experimentation. This lab is equipped with state-of-the-art equipment and resources for conducting chemical analyses, reactions, and research. Immerse yourself in the world of molecules, compounds, and reactions as you witness students and researchers engage in hands-on learning and discovery.",

    "The International Dean Office plays a crucial role in supporting and guiding international students at Cyprus Science University. This office is a hub of assistance, providing advice on matters such as immigration, visas, and cultural integration. Knowledgeable staff members are available to answer queries and facilitate a smooth transition for international students, ensuring they have a rewarding and enriching experience.",

    "Step into the second-floor classroom in Block A, where engaging academic sessions unfold. These classrooms are thoughtfully designed to facilitate effective teaching and learning. Equipped with modern amenities, comfortable seating, and interactive technology, these classrooms create an ideal environment for intellectual discussions, collaborative projects, and academic growth.",

    "The Conference Hall within Cyprus Science University serves as a venue for various academic and professional events. With its spacious layout, comfortable seating, and advanced audiovisual facilities, the hall accommodates conferences, seminars, guest lectures, and workshops. This is where ideas are shared, collaborations are formed, and knowledge is disseminated beyond the boundaries of the university.",

    "Welcome to the Nursing Lab, a state-of-the-art facility within Cyprus Science University. Here, aspiring nurses embark on their journey of hands-on learning. This lab replicates a hospital environment, complete with patient simulators and medical equipment. Witness the dedication of nursing students as they practice essential skills, such as patient assessment, medication administration, and responding to medical emergencies. This is where theoretical knowledge meets real-world application, preparing nurses for their vital role in healthcare.",
    
    "Designed to cater to the younger generation, the Kids Classroom provides a nurturing environment for early education within Cyprus Science University. This vibrant and engaging space is tailored to meet the needs of young learners, fostering curiosity, creativity, and foundational skills. Equipped with age-appropriate educational resources and playful décor, the Kids Classroom sparks the joy of learning in children.",

    "The first-floor classrooms in Block A are spaces dedicated to academic instruction and learning. These classrooms provide a supportive environment for students to engage with course materials, collaborate with peers, and participate in interactive discussions. Equipped with modern technology and comfortable seating, these classrooms facilitate effective teaching and foster a conducive atmosphere for academic growth.",

    "Block B is a prominent building within Cyprus Science University. This multifunctional facility houses various departments, administrative offices, and classrooms. Its modern architecture and strategic layout provide an environment conducive to academic pursuits and administrative functions. Explore Block B to discover the diverse academic and administrative resources available within this integral part of the university.",

    "Welcome to the Theater at Cyprus Science University, a space dedicated to the performing arts. This venue hosts theatrical performances, concerts, dance recitals",

    "This recreational space offers a delightful combination of leisure and intellectual engagement. Engage in a friendly game of minigolf, navigating through challenging obstacles while enjoying the surrounding greenery. Alternatively, exercise your strategic thinking with a game of chess, honing your skills and engaging in friendly competition. This area provides a serene ambiance where students can unwind, socialize, and engage in recreational activities. ",

    "Step onto the CSU Basketball Court, a vibrant space where sportsmanship and teamwork thrive. This outdoor court provides a dedicated space for basketball enthusiasts to hone their skills, engage in friendly matches, and participate in organized tournaments. Whether you're a seasoned player or new to the game, this court invites you to embrace the spirit of athleticism, passion, and camaraderie.",

    "The Orange Café Front is a bustling hub of social activity within Cyprus Science University. This inviting area serves as the entrance to the Orange Café, a vibrant and modern eatery on campus. As you approach the café, you'll be greeted by its contemporary design, comfortable seating arrangements, and a vibrant atmosphere. This front area creates a welcoming ambiance, inviting students, faculty, and visitors to indulge in delicious refreshments, engage in conversations, and take a moment to recharge.",

    "Indulge your senses in the inviting atmosphere of the Cafe within Cyprus Science University. Here, you'll find a cozy and stylish space, where students and visitors come to recharge and socialize. The aroma of freshly brewed coffee fills the air as you explore the comfortable seating arrangements and vibrant ambiance. Treat yourself to a delightful range of snacks, beverages, and meals while immersing yourself in conversations and enjoying a moment of relaxation. ",

    "This area combines the excitement of billiards with the vibrant atmosphere of the Orange Café. Engage in friendly matches or showcase your cue skills as you enjoy the social ambiance of this dedicated billiards area. With well-maintained tables, comfortable seating, and a lively atmosphere, Orange Café Billiards offers a perfect setting for students to relax, socialize, and indulge in a game of billiards.",

    "Enter the CSU Library, a haven of knowledge and intellectual exploration. This expansive library houses a vast collection of books, digital resources, research materials, and academic journals. As you step into this quiet and serene space, you'll be surrounded by rows of shelves, study desks, and cozy reading nooks. Immerse yourself in the world of literature, research, and discovery as you embark on a journey of academic exploration and personal growth.",

    " the CSU Parking area provides convenient and secure parking facilities for students, faculty, and visitors. This designated parking space offers ample room for vehicles, ensuring a hassle-free experience when commuting to the university. With its well-organized layout and safety measures, the CSU Parking area aims to provide ease of access and convenience for all those who choose to park their vehicles on campus.",

];
const titleList = [
    "University Entrance", 
    "Administration Building", 
    "Finance Office", 
    "International Office", 
    "International Office", 
    "Block A entrance", 
    "Block A corridor", 
    "Block A Classroom", 
    "Electronic Laboratory", 
    "Mechatronic Laboratory", 
    "Computer Laboratory", 
    "Chemestry Laboratory", 
    "International Dean Office", 
    "Block A second floor classroom", 
    "Conference Hall", 
    "Nursing Laboratory",
    "Kids Classroom", 
    "Block A first floor classrooms", 
    "Block B", 
    "Theater", 
    "Minigolf and Chess Area",
    "CSU Basketball Court", 
    "Orange café front", 
    "Inside Orange café",  
    "Orange café Billiard", 
    "CSU Library", 
    "CSU Parking" 
]; 

const pov = [
    {heading: 55.85948442988762, pitch: 3.070489772500892}, 
    {heading: 67.8024390130424, pitch: 5.076137143889497},
    {heading: 189.97872748603834, pitch: -2.3452081548839345},
    {heading: 94.8710716085362, pitch: -7.754865133035324},
    {heading: 94.8710716085362, pitch: -7.754865133035324},
    {heading: 302.34670412230497, pitch: 0.650743770469532},
    {heading: 302.34670412230497, pitch: 0.650743770469532},
    {heading: 272.7811924358566, pitch: -17.503530316987877},
    {heading: 244.5150664000356, pitch: -12.186800873235484}, 
    {heading: 357.3032633202188, pitch: -11.981755341717246}, 
    {heading: 357.3032633202188, pitch: -11.981755341717246}, 
    {heading: 206.33303570477972, pitch: -20.16266253236762}, 
    {heading: 49.57357743616532, pitch: -24.08746363097839}, 
    {heading: 150.48631720566624, pitch: -16.41268950185635}, 
    {heading: 150.48631720566624, pitch: -16.41268950185635}, 
    {heading: 195.66884276120166, pitch: -15.463579385721744},
    {heading: 292.895360910987, pitch: -18.01221758404131}, 
    {heading: 124.47510491262346, pitch: -6.268144537639714}, 
    {heading: 49.2867520013077, pitch: -2.1839807831311617}, 
    {heading: 339.412665814168, pitch: -3.2864319681696372}, 
    {heading: 0.14821941310708553, pitch: 3.158532228370021},
    {heading: 2.078478511226371, pitch: -5.657955043355287}, 
    {heading: 70.12334159307034, pitch: 4.460062292136158}, 
    {heading: 200.3972578850081, pitch: -1.0165577215008739},  
    {heading: 161.28669437728593, pitch: -6.589022670994609}, 
    {heading: 201.28904667788268, pitch: -6.9449960817155585}, 
    {heading: 179.78654106902053, pitch: -7.413233591915713} 
]; 
let allPlaces = []; 
let placeId = 0; 
places.forEach((place) => {
    allPlaces.push(new Place(placeId, place));
    allPlaces[placeId].setTile(titleList[placeId]); 
    allPlaces[placeId].setDescription(descriptionList[placeId]);
    allPlaces[placeId].setPov(pov[placeId]);
    
    placeId++; 
}); 

export const csu = allPlaces; 