import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Company from './components/Pages/Company';
import Contact from './components/Pages/Contact';
import NewProject from './components/Pages/NewProject';
import Projects from './components/Pages/Projects';
import Project from './components/Pages/Project';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Container customClass="min-height"><Home /></Container>} />
                    <Route path="/projects" element={<Container customClass="min-height"><Projects /></Container>} />
                    <Route path="/contact" element={<Container customClass="min-height"><Contact /></Container>} />
                    <Route path="/company" element={<Container customClass="min-height"><Company /></Container>} />
                    <Route path="/newproject" element={<Container customClass="min-height"><NewProject /></Container>} />
                    <Route path="/project/:id" element={<Container customClass="min-height"><Project /></Container>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
