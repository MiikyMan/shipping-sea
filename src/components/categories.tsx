import "./styles/styles.css"
import IconButton from '@mui/material/IconButton';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ComputerIcon from '@mui/icons-material/Computer';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';

function Categories(){
    return(
        <>
            <div className="categories-container">
                <div className="category">
                    <div className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <PhoneIphoneIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </div>
                    <div className="category-desc">
                        Phone
                    </div>
                </div>
                <div className="category">
                    <div className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <ComputerIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </div>
                    <div className="category-desc">
                        Computer
                    </div>
                </div>
                <div className="category">
                    <div className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <CameraAltIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </div>
                    <div className="category-desc">
                        Camera
                    </div>
                </div>
                <div className="category">
                    <div className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <HeadphonesIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </div>
                    <div className="category-desc">
                        Headset
                    </div>
                </div>
                <div className="category">
                    <div className="category-btn">
                        <IconButton className="category-btn" sx={{ fontSize: 90}}>
                            <SurroundSoundIcon sx={{ color:'#ffffff', fontSize: 50}}/>
                        </IconButton>
                    </div>
                    <div className="category-desc">
                        Speaker
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;
