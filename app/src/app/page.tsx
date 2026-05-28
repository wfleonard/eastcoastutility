"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import ContactModal from "@/components/ContactModal";
import PartnerCard from "@/components/PartnerCard";
import { partners } from "@/lib/partners";

export default function Home() {
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <main id="top">
            <Header onContactClick={() => setContactOpen(true)} />

            {/* Intro: About ECU + Sidebar */}
            <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[2fr_1fr]">
                <article className="space-y-4 text-foreground/90">
                    <h2 className="text-2xl font-bold text-accent">
                        About East Coast Utility and Tom Colleran
                    </h2>
                    <p>
                        Founded in 2008, Thomas Colleran is the owner and managing
                        director of East Coast Utility, LLC, a company specializing in
                        horizontal directional drilling (HDD) and utility construction
                        services. Based in New Jersey, East Coast Utility operates across
                        several states including New York, Pennsylvania, Delaware, and
                        Maryland.
                    </p>
                    <p>
                        Under Tom Colleran&apos;s leadership, East Coast Utility has
                        focused on providing effective and minimally invasive drilling
                        solutions for installing underground utilities. Colleran has
                        played a crucial role in the company&apos;s growth and its
                        commitment to quality and environmental sustainability.
                    </p>
                    <p>
                        East Coast Utility has demonstrated significant expertise in
                        various HDD projects. For instance, they have successfully
                        completed HDD gas work for Elizabethtown Gas and NJ Natural Gas,
                        enhancing the reliability and efficiency of gas infrastructure
                        with minimal surface disruption. Additionally, they have been
                        involved in the installation of fiber optic cables at McGuire Air
                        Force Base, ensuring robust and secure connectivity. The company
                        has also contributed to the installation of traffic signals,
                        leveraging HDD to improve urban infrastructure with minimal
                        disruption to roadways. Their work on low voltage lighting along
                        major transportation routes and fiber runs for surveillance
                        cameras has further showcased their capability in enhancing
                        safety and visibility through advanced horizontal directional
                        drilling techniques.
                    </p>
                    <p>
                        East Coast Utility&apos;s commitment to innovative solutions and
                        sustainable practices has solidified its reputation as a reliable
                        partner in the utility construction industry, delivering
                        high-quality services across a range of projects.
                    </p>

                    <hr className="border-border" />
                    <h2 className="text-2xl font-bold text-accent">
                        ECU Horizontal Directional Drilling Services
                    </h2>
                    <ul className="ml-5 list-disc space-y-2">
                        <li>
                            <strong>Trenchless Technology:</strong> Minimizes surface
                            disruption by drilling underground.
                        </li>
                        <li>
                            <strong>Pilot Hole Drilling:</strong> Initial borehole is
                            drilled along a predetermined path.
                        </li>
                        <li>
                            <strong>Reaming:</strong> Enlarges the pilot hole to the
                            required diameter using reamers.
                        </li>
                        <li>
                            <strong>Pipe Installation:</strong> Pulls back the utility
                            pipe through the reamed hole.
                        </li>
                        <li>
                            <strong>Versatile Applications:</strong> Suitable for
                            installing water, gas, sewer lines, and telecommunications
                            cables.
                        </li>
                        <li>
                            <strong>Environmental Benefits:</strong> Reduces impact on
                            sensitive areas like wetlands and urban settings.
                        </li>
                        <li>
                            <strong>Precision and Control:</strong> Uses real-time
                            guidance systems to steer the drill accurately.
                        </li>
                    </ul>
                </article>

                <aside className="space-y-4 rounded-lg border border-border bg-muted p-6 text-center">
                    <Image
                        src="/images/east-coast-utility-logo.png"
                        alt="East Coast Utility logo"
                        width={240}
                        height={240}
                        className="mx-auto h-auto w-3/5"
                    />
                    <div>
                        <h2 className="text-xl font-bold">East Coast Utility, LLC</h2>
                        <cite className="not-italic text-sm text-foreground/70">
                            Based out of Fair Haven, NJ
                        </cite>
                    </div>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a
                                href="mailto:tom@eastcoastutility.com"
                                className="text-accent hover:underline"
                            >
                                tom@eastcoastutility.com
                            </a>
                        </li>
                        <li>
                            <a
                                href="tel:+19089026728"
                                className="text-accent hover:underline"
                            >
                                +1 908-902-6728
                            </a>
                        </li>
                    </ul>
                    <Image
                        src="/images/TomColleranEastCoastUtilityNJHorizontalDirectionalDrilling01.jpg"
                        alt="Tom Colleran"
                        width={240}
                        height={300}
                        className="mx-auto h-auto w-3/5 rounded"
                    />
                    <div>
                        <h2 className="text-lg font-bold">Tom Colleran</h2>
                        <h3 className="text-sm text-foreground/70">Owner, ECU</h3>
                    </div>
                </aside>
            </section>

            {/* Hero gallery */}
            <section className="bg-muted py-8">
                <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
                    {[
                        "JT20-Details-134.jpg",
                        "JT20-hero-image.jpg",
                        "Productivity_JT20-Details-070 (1).jpg",
                    ].map((file, i) => (
                        <div key={file} className="overflow-hidden rounded">
                            <Image
                                src={`/images/${file}`}
                                alt={`ECU HDD Image ${i + 1}`}
                                width={600}
                                height={400}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Competencies + Why ECU */}
            <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-2xl font-bold text-accent">
                        ECU Core HDD Competencies
                    </h2>
                    <dl className="space-y-3">
                        <Definition
                            term="Precision Drilling"
                            def="Expert navigation and control for accurate bore path execution."
                        />
                        <Definition
                            term="Soil Analysis"
                            def="Comprehensive geotechnical assessments to determine suitable drilling techniques."
                        />
                        <Definition
                            term="Environmental Compliance"
                            def="Adherence to environmental regulations and best practices to minimize ecological impact."
                        />
                        <Definition
                            term="Equipment Proficiency"
                            def="Skilled operation and maintenance of advanced HDD machinery and technology."
                        />
                        <Definition
                            term="Project Management"
                            def="Efficient planning, coordination, and execution of HDD projects from start to finish."
                        />
                        <Definition
                            term="Problem Solving"
                            def="Ability to address and resolve unexpected challenges during drilling operations."
                        />
                    </dl>
                </div>
                <div>
                    <h2 className="mb-4 text-2xl font-bold text-accent">
                        Why Choose East Coast Utility
                    </h2>
                    <dl className="space-y-3">
                        <Definition
                            term="Expertise in HDD"
                            def="Skilled professionals with extensive experience in horizontal directional drilling ensure precise and efficient installations."
                        />
                        <Definition
                            term="Environmental Responsibility"
                            def="Commitment to minimizing ecological impact through eco-friendly drilling practices and adherence to environmental regulations."
                        />
                        <Definition
                            term="Advanced Technology"
                            def="Utilization of state-of-the-art HDD equipment and technology for reliable and effective utility installations."
                        />
                        <Definition
                            term="Comprehensive Services"
                            def="Offering a wide range of utility construction services, including water and wastewater treatment infrastructure."
                        />
                        <Definition
                            term="Proven Track Record"
                            def="A history of successful projects and satisfied clients across various states, demonstrating reliability and excellence."
                        />
                    </dl>
                </div>
            </section>

            {/* Partners */}
            <section className="bg-muted py-12">
                <div className="mx-auto max-w-6xl px-4">
                    <p className="mb-6 text-center text-sm text-foreground/70">
                        Click on ECU&apos;s Partners for more Information
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {partners.map((p) => (
                            <PartnerCard key={p.id} partner={p} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About / CTA */}
            <section
                id="about"
                className="mx-auto max-w-4xl px-4 py-12 text-center"
            >
                <h2 className="mb-4 text-2xl font-bold text-accent">
                    East Coast Utility, Inc.
                </h2>
                <p className="text-foreground/90">
                    At East Coast Utility, we specialize in delivering top-tier horizontal
                    directional drilling solutions with unmatched precision and
                    reliability. Our team leverages cutting-edge technology and extensive
                    industry expertise to ensure seamless, efficient, and environmentally
                    friendly drilling operations. From intricate urban projects to
                    expansive infrastructure developments, East Coast Utility is dedicated
                    to achieving excellence in every job. Trust us to power your projects
                    forward with innovative techniques and a commitment to superior
                    service, making East Coast Utility your premier partner in horizontal
                    directional drilling.
                </p>
                <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="mt-6 rounded bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
                >
                    Get in touch
                </button>
            </section>

            <ContactModal
                open={contactOpen}
                onClose={() => setContactOpen(false)}
            />
        </main>
    );
}

function Definition({ term, def }: { term: string; def: string }) {
    return (
        <div>
            <dt className="font-bold">{term}</dt>
            <dd className="text-foreground/80">{def}</dd>
        </div>
    );
}
