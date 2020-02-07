import React from 'react';
import './Description.css';


const Description = (props) => {
    return (
    <div className="description-container">
        <h4>{`Monitorizore Trafic`}</h4>
        <p>
            {`Aplicația accesează serviciul World Traffic Service publicat de Esri în parteneriat cu HERE și prezintă evoluția traficului de-a lungul unei zile, din 15 în 15 minute până la momentul deschiderii paginii.\nTehnologii folosite pentru crearea aplicației: React, Reacstrap și Javascript API for ArcGIS.`}
        </p>
    </div >);
}

export default Description;