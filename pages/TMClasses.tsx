
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Info, ShieldCheck } from 'lucide-react';

const tmClasses = [
    { class: 1, terms: "Chemicals for use in industry, science and photography, as well as in agriculture, horticulture and forestry; Unprocessed artificial resins, unprocessed plastics; Fire extinguishing and fire prevention compositions; Tempering and soldering preparations; Substances for tanning animal skins and hides; Adhesives for use in industry; Putties and other paste fillers; Compost, manures, fertilizers; Biological preparations for use in industry and science" },
    { class: 2, terms: "Paints, varnishes, lacquers; Preservatives against rust and against deterioration of wood; Colorants, dyes; Inks for printing, marking and engraving; Raw natural resins; Metals in foil and powder form for use in painting, decorating, printing and art" },
    { class: 3, terms: "Non-medicated cosmetics and toiletry preparations; Non-medicated dentifrices; Perfumery, essential oils; Bleaching preparations and other substances for laundry use; Cleaning, polishing and abrasive preparations" },
    { class: 4, terms: "Industrial oils and greases, wax; Lubricants; Dust absorbing, wetting and binding compositions; Fuels and illuminants; Candles and wicks for lighting" },
    { class: 5, terms: "Pharmaceuticals, medical and veterinary preparations; Sanitary preparations for medical purposes; Dietetic food and substances adapted for medical or veterinary use, food for babies; Dietary supplements for human beings and animals; Plasters, materials for dressings; Material for stopping teeth, dental wax; Disinfectants; Preparations for destroying vermin; Fungicides, herbicides" },
    { class: 6, terms: "Common metals and their alloys, ores; Metal materials for building and construction; Transportable buildings of metal; Non-electric cables and wires of common metal; Small items of metal hardware; Metal containers for storage or transport; Safes" },
    { class: 7, terms: "Machines, machine tools, power-operated tools; Motors and engines, except for land vehicles; Machine coupling and transmission components, except for land vehicles; Agricultural implements, other than hand-operated hand tools; Incubators for eggs; Automatic vending machines" },
    { class: 8, terms: "Hand tools and implements, hand-operated; Cutlery; Side arms, except firearms; Razors" },
    { class: 9, terms: "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments; Apparatus and instruments for conducting, switching, transforming, accumulating, regulating or controlling the distribution or use of electricity; Apparatus and instruments for recording, transmitting, reproducing or processing sound, images or data; Recorded and downloadable media, computer software, blank digital or analogue recording and storage media; Mechanisms for coin-operated apparatus; Cash registers, calculating devices; Computers and computer peripheral devices; Diving suits, divers' masks, ear plugs for divers, nose clips for divers and swimmers, gloves for divers, breathing apparatus for underwater swimming; Fire-extinguishing apparatus" },
    { class: 10, terms: "Surgical, medical, dental and veterinary apparatus and instruments; Artificial limbs, eyes and teeth; Orthopaedic articles; Suture materials; Therapeutic and assistive devices adapted for persons with disabilities; Massage apparatus; Apparatus, devices and articles for nursing infants; Sexual activity apparatus, devices and articles" },
    { class: 11, terms: "Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating, water supply and sanitary purposes" },
    { class: 12, terms: "Vehicles; Apparatus for locomotion by land, air or water" },
    { class: 13, terms: "Firearms; Ammunition and projectiles; Explosives; Fireworks" },
    { class: 14, terms: "Precious metals and their alloys; Jewellery, precious and semi-precious stones; Horological and chronometric instruments" },
    { class: 15, terms: "Musical instruments; Music stands and stands for musical instruments; Conductors' batons" },
    { class: 16, terms: "Paper and cardboard; Printed matter; Bookbinding material; Photographs; Stationery and office requisites, except furniture; Adhesives for stationery or household purposes; Drawing materials and materials for artists; Paintbrushes; Instructional and teaching materials; Plastic sheets, films and bags for wrapping and packaging; Printers' type, printing blocks" },
    { class: 17, terms: "Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica and substitutes for all these materials; Plastics and resins in extruded form for use in manufacture; Packing, stopping and insulating materials; Flexible pipes, tubes and hoses, not of metal" },
    { class: 18, terms: "Leather and imitations of leather; Animal skins and hides; Luggage and carrying bags; Umbrellas and parasols; Walking sticks; Whips, harness and saddlery; Collars, leashes and clothing for animals" },
    { class: 19, terms: "Materials, not of metal, for building and construction; Rigid pipes, not of metal, for building; Asphalt, pitch, tar and bitumen; Transportable buildings, not of metal; Monuments, not of metal" },
    { class: 20, terms: "Furniture, mirrors, picture frames; Containers, not of metal, for storage or transport; Unworked or semi-worked bone, horn, whalebone or mother-of-pearl; Shells; Meerschaum; Yellow amber" },
    { class: 21, terms: "Household or kitchen utensils and containers; Cookware and tableware, except forks, knives and spoons; Combs and sponges; Brushes, except paintbrushes; Brush-making materials; Articles for cleaning purposes; Unworked or semi-worked glass, except building glass; Glassware, porcelain and earthenware" },
    { class: 22, terms: "Ropes and string; Nets; Tents and tarpaulins; Awnings of textile or synthetic materials; Sails; Sacks for the transport and storage of materials in bulk; Padding, cushioning and stuffing materials, except of paper, cardboard, rubber or plastics; Raw fibrous textile materials and substitutes therefor" },
    { class: 23, terms: "Yarns and threads for textile use" },
    { class: 24, terms: "Textiles and substitutes for textiles; Household linen; Curtains of textile or plastic" },
    { class: 25, terms: "Clothing, footwear, headwear" },
    { class: 26, terms: "Lace, braid and embroidery, and haberdashery ribbons and bows; Buttons, hooks and eyes, pins and needles; Artificial flowers; Hair decorations; False hair" },
    { class: 27, terms: "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; Wall hangings, not of textile" },
    { class: 28, terms: "Games, toys and playthings; Video game apparatus; Gymnastic and sporting articles; Decorations for Christmas trees" },
    { class: 29, terms: "Meat, fish, poultry and game; Meat extracts; Preserved, frozen, dried and cooked fruits and vegetables; Jellies, jams, compotes; Eggs; Milk, cheese, butter, yogurt and other milk products; Oils and fats for food" },
    { class: 30, terms: "Coffee, tea, cocoa and substitutes therefor; Rice, pasta and noodles; Tapioca and sago; Flour and preparations made from cereals; Bread, pastries and confectionery; Chocolate; Ice cream, sorbets and other edible ices; Sugar, honey, treacle; Yeast, baking-powder; Salt, seasonings, spices, preserved herbs; Vinegar, sauces and other condiments; Ice [frozen water]" },
    { class: 31, terms: "Raw and unprocessed agricultural, aquacultural, horticultural and forestry products; Raw and unprocessed grains and seeds; Fresh fruits and vegetables, fresh herbs; Natural plants and flowers; Bulbs, seedlings and seeds for planting; Live animals; Foodstuffs and beverages for animals; Malt" },
    { class: 32, terms: "Beers; Non-alcoholic beverages; Mineral and aerated waters; Fruit beverages and fruit juices; Syrups and other preparations for making non-alcoholic beverages" },
    { class: 33, terms: "Alcoholic beverages, except beers; Alcoholic preparations for making beverages" },
    { class: 34, terms: "Tobacco and tobacco substitutes; Cigarettes and cigars; Electronic cigarettes and oral vaporizers for smokers; Smokers' articles; Matches" },
    { class: 35, terms: "Advertising; Business management, organization and administration; Office functions" },
    { class: 36, terms: "Financial, monetary and banking services; Insurance services; Real estate services" },
    { class: 37, terms: "Construction services; Installation and repair services; Mining extraction, oil and gas drilling" },
    { class: 38, terms: "Telecommunications services" },
    { class: 39, terms: "Transport; Packaging and storage of goods; Travel arrangement" },
    { class: 40, terms: "Treatment of materials; Recycling of waste and trash; Air purification and treatment of water; Printing services; Food and drink preservation" },
    { class: 41, terms: "Education; Providing of training; Entertainment; Sporting and cultural activities" },
    { class: 42, terms: "Scientific and technological services and research and design relating thereto; Industrial analysis, industrial research and industrial design services; Quality control and authentication services; Design and development of computer hardware and software" },
    { class: 43, terms: "Services for providing food and drink; Temporary accommodation" },
    { class: 44, terms: "Medical services; Veterinary services; Hygienic and beauty care for human beings or animals; Agriculture, aquaculture, horticulture and forestry services" },
    { class: 45, terms: "Legal services; Security services for the physical protection of tangible property and individuals; Dating services, online social networking services; Funerary services; Babysitting" }
];

const TMClasses: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header section with gradient background */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Trademark Classes</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl">
                            The Nice Classification (NCL) is an international classification of goods and services applied for the registration of marks.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* List section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Goods & Services Classification</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tmClasses.map((item, idx) => (
                            <motion.div
                                key={item.class}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.02 }}
                                className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        {item.class}
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                                        {item.class <= 34 ? "Goods" : "Services"}
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {item.terms}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Information section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                                    <Info className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Why are TM Classes Important?</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    When applying for a trademark, you must specify the classes of goods and services for which you wish to protect your mark. This classification system helps organize trademarks and makes search processes more efficient.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Expert Guidance Available</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    Selecting the wrong class can lead to rejection or limited protection. Our experts help you identify the most appropriate and comprehensive classes for your business to ensure maximum legal safety.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TMClasses;
