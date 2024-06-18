import "./styles/styles.css"
import IconButton from '@mui/material/IconButton';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ComputerIcon from '@mui/icons-material/Computer';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Categories(){

    return(
        <>
            <div className="categories-container">
                <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                    type: "spring",
                    damping: 7,
                    stiffness: 100,
                    restDelta: 0.001
                    }
                }}
                >
                <div className="category">
                    <Link to={`/category?name=smartphones`} className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <PhoneIphoneIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </Link>
                    <div className="category-desc">
                        Phone
                    </div>
                </div>
                </motion.div>
                <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                    type: "spring",
                    damping: 7,
                    stiffness: 100,
                    restDelta: 0.001
                    }
                }}
                >
                <div className="category">
                    <Link to={`/category?name=electronics`} className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <ComputerIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </Link>
                    <div className="category-desc">
                        Electronics
                    </div>
                </div>
                </motion.div>
                <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                    type: "spring",
                    damping: 7,
                    stiffness: 100,
                    restDelta: 0.001
                    }
                }}
                >
                <div className="category">
                    <Link to={`/category?name=cameras`} className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <CameraAltIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </Link>
                    <div className="category-desc">
                        Camera
                    </div>
                </div>
                </motion.div>
                <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                    type: "spring",
                    damping: 7,
                    stiffness: 100,
                    restDelta: 0.001
                    }
                }}
                >
                <div className="category">
                    <Link to={`/category?name=headphones`} className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <HeadphonesIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </Link>
                    <div className="category-desc">
                        Headset
                    </div>
                </div>
                </motion.div>
                <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                    type: "spring",
                    damping: 7,
                    stiffness: 100,
                    restDelta: 0.001
                    }
                }}
                >
                <div className="category">
                    <Link to={`/category?name=speakers`} className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <SurroundSoundIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </Link>
                    <div className="category-desc">
                        Speaker
                    </div>
                </div>
                </motion.div>
            </div>
        </>
    )
}

export default Categories;
