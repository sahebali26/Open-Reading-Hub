document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    alert(`Searching for: ${query}`);
});
// Smooth Scroll to Books Section
document.getElementById('get-started-btn').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const booksSection = document.getElementById('books');
    booksSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the books section
});




    
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}
document.addEventListener('click', function (event) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger');

    // Close sidebar if clicking outside of it
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});
const papers = [
    {
        year: 2025,
        semester: "2nd Semester",
        subject: "Economics",
        course: "BA",
        filePath: "file:///S:/My%20File/MY%20SITE/Sources/Graduation/Qs/2nd%20sem/ECO-2ND_SEM_GU_pr-SHBALI.pdf"
    },
    // Add more papers here...
];

function populateTable(filteredPapers = papers) {
    const tableBody = document.querySelector("#questionPapersTable tbody");
    tableBody.innerHTML = "";

    filteredPapers.forEach(paper => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${paper.year}</td>
            <td>${paper.semester}</td>
            <td>${paper.subject}</td>
            <td>${paper.course}</td>
            <td><a href="${paper.filePath}" target="_blank">Download</a></td>
        `;
        tableBody.appendChild(row);
    });
}

function filterPapers() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const yearFilter = document.getElementById("yearFilter").value;
    const semesterFilter = document.getElementById("semesterFilter").value;
    const courseFilter = document.getElementById("courseFilter").value;

    const filteredPapers = papers.filter(paper => 
        (paper.year.toString().includes(searchInput) ||
        paper.semester.toLowerCase().includes(searchInput) ||
        paper.subject.toLowerCase().includes(searchInput) ||
        paper.course.toLowerCase().includes(searchInput)) &&
        (yearFilter === "" || paper.year.toString() === yearFilter) &&
        (semesterFilter === "" || paper.semester === semesterFilter) &&
        (courseFilter === "" || paper.course === courseFilter)
    );

    populateTable(filteredPapers);
}

// Populate table on page load
populateTable();
document.getElementById('contactForm').addEventListener('submit', function (event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        event.preventDefault();
    } else if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// Function to handle profile creation
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const college = document.getElementById('college').value;
    const profilePhoto = document.getElementById('profilePhoto').files[0];

    if (!fullName || !email || !college || !profilePhoto) {
        alert('Please fill out all fields.');
        return;
    }

    // Save profile data to localStorage
    const reader = new FileReader();
    reader.onload = function (e) {
        const profile = {
            fullName,
            email,
            college,
            profilePhoto: e.target.result,
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        alert('Profile created successfully!');
        window.location.href = 'index.html'; // Redirect to home page
    };
    reader.readAsDataURL(profilePhoto);
});

// Function to display profile in the header
function displayProfile() {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    if (profile) {
        const profileDisplay = document.createElement('div');
        profileDisplay.className = 'profile-display';
        profileDisplay.innerHTML = `
            <img src="${profile.profilePhoto}" alt="Profile Photo">
            <span>${profile.fullName}</span>
        `;
        document.querySelector('.auth-buttons').appendChild(profileDisplay);
    }
}

// Call displayProfile on page load
window.onload = displayProfile;     
// Function to simulate user login
function login(username) {
    // Hide the login button
    document.getElementById('auth-buttons').style.display = 'none';

    // Get the first letter of the username
    const initial = username.charAt(0).toUpperCase();

    // Display the user's initial
    const userInitialElement = document.getElementById('user-initial');
    userInitialElement.textContent = initial;
    userInitialElement.classList.add('show');
}

// Example: Simulate a user login (replace with actual login logic)
const user = { name: "Saheb Ali" }; // Replace with actual user data
login(user.name);
// Function to handle logout
function logout() {
    // Show the login button
    document.getElementById('auth-buttons').style.display = 'block';

    // Hide the user's initial
    const userInitialElement = document.getElementById('user-initial');
    userInitialElement.textContent = '';
    userInitialElement.classList.remove('show');
}

// Example: Add a click event to the user initial for logout
document.getElementById('user-initial').addEventListener('click', logout);