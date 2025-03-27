import React, { useState } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VegetablesImage from '../../assets/vegetables.jpg';

const AvatarDropdown = () => {
    const [name, setName] = useState("John Doe");

    const handleLogout = () => {
        console.log("Logged out");
    };

    return (
        <div className="d-flex align-items-center" style={{ paddingLeft: '12px' }}>
            {/* Avatar Image with dropdown toggle */}
            <Dropdown drop={"down"}>
                <Dropdown.Toggle
                    variant="link"
                    id="dropdown-avatar"
                    className="p-0" // Remove any padding to keep it just the image
                >
                    <Image
                        src={VegetablesImage}
                        roundedCircle
                        alt="Avatar"
                        width="40"
                        height="40"
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ padding: 0 }} className="text-center" >
                    <Dropdown.ItemText style={{ padding: "10px" }}>{name}</Dropdown.ItemText>
                    <Dropdown.Divider style={{ padding: 0, margin: 0 }} />
                    <Dropdown.Item style={{ padding: "10px" }} onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default AvatarDropdown;
