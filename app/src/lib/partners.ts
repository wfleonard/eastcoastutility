/**
 * Partner data for the ECU "Our Partners" gallery.
 * Each partner with `blurb` populated renders as a clickable card that
 * opens a modal with the long-form description ported from website2024.
 */

export type Partner = {
    id: string;
    name: string;
    logo: string;        // filename under /public/images/
    alt: string;
    blurb?: string;      // if present, card is clickable and opens a modal
};

export const partners: Partner[] = [
    {
        id: "skoda",
        name: "Skoda Contracting",
        logo: "scoda-contracting.png",
        alt: "East Coast Utility Skoda Contracting",
        blurb:
            "East Coast Utility (ECU) working with Skoda Contracting has demonstrated significant expertise in the gas sector through their successful use of Horizontal Directional Drilling (HDD) for Elizabethtown Gas and NJ Natural Gas. By implementing advanced HDD techniques, ECU has enhanced the reliability and efficiency of gas infrastructure, minimized surface disruption, and ensured a seamless gas supply. Their dedication to innovation and precision has set a benchmark in the industry, showcasing their capability to manage complex gas installations with minimal environmental impact.",
    },
    {
        id: "pseg",
        name: "PSE&G",
        logo: "pseg-logo.png",
        alt: "East Coast Utility PSE&G",
        blurb:
            "East Coast Utility (ECU) working with PSE&G has achieved remarkable success in the electrical industry by employing HDD for underground installations. Their proficiency in using HDD has allowed them to lay down electrical lines with high accuracy, reducing environmental disturbance and maintaining the aesthetic integrity of the landscape. ECU's commitment to using cutting-edge technology has ensured the consistent and reliable distribution of electricity to numerous communities, reinforcing their position as a leader in sustainable infrastructure development.",
    },
    {
        id: "kane",
        name: "Kane Contracting",
        logo: "kane-logo-blue-rgb.png",
        alt: "East Coast Utility Kane",
        blurb:
            "East Coast Utility (ECU) accomplishments at McGuire Air Force Base, as a Kane sub-contactor, highlight their expertise in deploying critical communication infrastructure using Horizontal Directional Drilling. Their successful installation of fiber optic cables in a high-security environment underscores their ability to deliver robust and secure connectivity solutions. East Coast Utility's meticulous planning and execution have ensured uninterrupted communication channels essential for the base's operations, demonstrating their competence in handling sensitive and high-stakes projects.",
    },
    {
        id: "ajm",
        name: "All Jersey Manufacturing",
        logo: "all-jersey-mechanical-logo.png",
        alt: "East Coast Utility All Jersey Mechanical",
        blurb:
            "East Coast Utility (ECU) working with All Jersey Manufacturing has excelled in utilizing HDD for the installation of remote propane stations and lighting systems at BJ's Club warehouses. Their strategic application of HDD has ensured safe and efficient connections, while maintaining minimal environmental and customer impact. This accomplishment reflects ECU's commitment to innovative solutions and their ability to enhance operational functionality and safety in commercial settings.",
    },
    {
        id: "njaw",
        name: "NJ American Water",
        logo: "ECUNJAmericanWaterLogo.png",
        alt: "East Coast Utility American Water",
        blurb:
            "East Coast Utility's, contacted by NJ American Water, use of HDD technology for water service installations has been a notable achievement in the utility sector. By leveraging HDD, they have efficiently placed water lines underground with reduced surface disruption, ensuring a reliable and continuous water supply. Their success in integrating HDD methods underscores their dedication to sustainable practices and their ability to meet customer needs while preserving environmental integrity.",
    },
    {
        id: "lv",
        name: "Lane Valente Industries",
        logo: "ECUNJLaneValenteLogo.jpeg",
        alt: "East Coast Utility Lane Valente",
        blurb:
            "East Coast Utility's (ECU), being a sub-contractor to Lane Valente, proficiency in repairing and maintaining lighting systems at The Home Depot warehouse locations using HDD is a testament to their technical expertise. Their ability to conduct necessary repairs with minimal operational interference has ensured well-lit, safe, and welcoming retail environments. ECU's accomplishments highlight their commitment to quality service and their capability to manage complex repair projects efficiently.",
    },
    {
        id: "njng",
        name: "NJ Natural Gas",
        logo: "ECUNJNaturalGas.png",
        alt: "East Coast Utility NJ Natural Gas",
    },
    {
        id: "etg",
        name: "Elizabethtown Gas",
        logo: "ECUNJElizabethtownGasLogo.png",
        alt: "East Coast Utility Elizabethtown Gas",
    },
    {
        id: "ecc",
        name: "Edward Cray Construction",
        logo: "ECUNJEdwardCrayConstruction.png",
        alt: "East Coast Utility Edward Cray Construction",
    },
    {
        id: "faigon",
        name: "Fai-Gon Electrical Contractors",
        logo: "fai-gon-electric-logo.jpg",
        alt: "East Coast Utility Fai-Gon",
        blurb:
            "East Coast Utility (ECU) working with Fai-gon Electrical Contractors, achievements in installing traffic signals using HDD have significantly improved urban infrastructure. Their precise and efficient installations have enhanced traffic management and safety, with minimal disruption to roadways. ECU's innovative approach and technical prowess in HDD applications have established them as a reliable partner in urban development projects, contributing to safer and more organized traffic systems.",
    },
    {
        id: "hbc",
        name: "HBC Electrical Contractors",
        logo: "hbcco-logo-new.jpg",
        alt: "East Coast Utility HBC Company",
        blurb:
            "East Coast Utility (ECU) working as a sub-contractor with HBC has successfully utilized HDD for various projects, including the installation of low voltage lighting along the Parkway and Turnpike, and running fiber optic cables for surveillance cameras. Their accomplishments in these areas have enhanced both lighting and security infrastructure with precision and minimal traffic disruption. ECU's expertise in HDD has been pivotal in upgrading essential services, ensuring enhanced safety and visibility on major transportation routes.",
    },
    {
        id: "ugi",
        name: "UGI Corporation",
        logo: "ugi-logo.png",
        alt: "East Coast Utility UGI Corp",
        blurb:
            "East Coast Utility (ECU) working with UGI's collaboration with Skoda for gas work using HDD in Pennsylvania highlights their significant achievements in modernizing gas infrastructure. Their use of advanced drilling techniques has ensured a reliable and efficient gas supply while minimizing environmental impact. ECU's dedication to innovation and sustainability has solidified their reputation as a forward-thinking utility provider, capable of executing complex projects with high standards of safety and efficiency.",
    },
];
