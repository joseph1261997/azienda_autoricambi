import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DoveSiamo: React.FC = () => {
    const position = { lat: 36.83605775153109, lng: 14.776525525967777 };
    const mapId = 'c56ba1c03a60923d';
    const [open, setOpen] = useState(false);

    return (
        <APIProvider apiKey="AIzaSyBndMTpNRJUcBSunzKcTEDNCTVRPXdjkKM">
            <div style={{ width: '100%', height: '100%' }}>
                <Map defaultCenter={position} defaultZoom={16} mapId={mapId} onClick={() => setOpen(false)}>
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin
                            background={'red'}
                            borderColor={'white'}
                            glyphColor={'white'}
                            scale={1.5}
                        />
                    </AdvancedMarker>
                    {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', textAlign: 'center', gap: 2 }}>
                            <Typography variant="h6">Raiad Autoricambi</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href={`https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'white' }}
                            >
                                Calcola percorso
                            </Button>
                        </Box>
                    </InfoWindow>}
                </Map>
            </div>
        </APIProvider>
    )
};

export default DoveSiamo;