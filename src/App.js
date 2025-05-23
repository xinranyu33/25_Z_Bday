import { useState, useRef, useEffect} from "react";
import { motion, useInView, AnimatePresence} from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, 
  XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import SparkleGroup from "./components/SparkleGroup";
// import Sparkle from "./components/Sparkle";

const data = [
  { month: 'Aug', callHours: 6, images: 325},
  { month: 'Sep', callHours: 13, images: 221},
  { month: "Oct", callHours: 33, images: 338},
  { month: "Nov", callHours: 38, images: 342},
  { month: "Dec", callHours: 20, images: 214},
  { month: "Jan", callHours: 30, images: 154},
  { month: "Feb", callHours: 41, images: 284},
  { month: "Mar", callHours: 36, images: 220},
  { month: "Apr", callHours: 32, images: 308},
  { month: "May", callHours: 10, images: 110},
];

const togetherData = [
  { name: "Days Together 💗", value: 90 },
  { name: "Days Apart 💞", value: 298 - 90 },
];

const COLORS = ['#E9C46A', '#264653'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  percent
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily = "'Gloria Hallelujah', cursive"
      fontSize={20}
      fontWeight="bold"
      style={{
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
      }}
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const TogetherPie = () => (
  <div className="w-full flex justify-center max-w-md 
  mx-auto my-12 text-center">
    <ResponsiveContainer width={450} height={360}>
      <PieChart>
        <Pie
          data={togetherData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={160}
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={true}
          // startAngle={0}
          // endAngle={sweepAngle}
          // paddingAngle={2}
          
        >
          {togetherData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);




const albums = [
  {
    title: "Occasions",
    
    images: [`${process.env.PUBLIC_URL}/images/occasions/1.jpg`, 
      `${process.env.PUBLIC_URL}/images/occasions/2.jpg`,
      `${process.env.PUBLIC_URL}/images/occasions/3.jpg`, 
      `${process.env.PUBLIC_URL}/images/occasions/4.jpg`,
      `${process.env.PUBLIC_URL}/images/occasions/5.jpg`, 
      `${process.env.PUBLIC_URL}/images/occasions/6.jpg`,
    ],
  },
  {
    title: "Little ones",
    images: [`${process.env.PUBLIC_URL}/images/littleones/1.jpg`, 
      `${process.env.PUBLIC_URL}/images/littleones/2.jpg`,
      `${process.env.PUBLIC_URL}/images/littleones/3.jpg`, 
      `${process.env.PUBLIC_URL}/images/littleones/4.jpg`,
      `${process.env.PUBLIC_URL}/images/littleones/5.jpg`, 
      `${process.env.PUBLIC_URL}/images/littleones/6.jpg`,
      `${process.env.PUBLIC_URL}/images/littleones/7.jpg`
    ],
  },
  
  {
    title: "All the lions",
    images: [`${process.env.PUBLIC_URL}/images/lions/1.jpg`, 
      `${process.env.PUBLIC_URL}/images/lions/2.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/3.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/4.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/5.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/6.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/7.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/8.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/9.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/10.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/11.jpg`,
      `${process.env.PUBLIC_URL}/images/lions/12.jpg`
    ],
  },
];

// const rotations = ["-6deg", "4deg", "-3deg", "5deg", "-5deg", "3deg"];

const CollapsibleAlbum = ({ title, images }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="mb-8 text-center">
      {/* <button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.08 }} className="relative w-32 h-32 mx-auto mb-2"> */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative w-40 h-40 mx-auto mb-2"
      >

        {/* Sticker Title */}
          <div
            className="absolute -top-5 -left-1 rotate-[-6deg] bg-yellow-200 
            text-black px-3 py-1 rounded-lg shadow-md font-bold text-md z-40"
            style={{
              fontFamily: "'Gloria Hallelujah', cursive",
              textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
            }}
          >
          {title}
        </div>

        {/* Stack of photo cards */}
        {images.slice(0, 3).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Preview ${i}`}
            className={`absolute w-full h-full object-cover rounded-xl border-2 border-white shadow-md transform 
              ${i === 0 ? 'rotate-[-10deg] z-10' : i === 1 ? 'rotate-[5deg] z-20' : 'rotate-[0deg] z-30'}`}
            style={{ top: 0, left: 0 }}
            
          />
        ))}

      {/* </button> */}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
          >
            <div className="bg-white rounded-xl shadow-xl max-w-4xl 
            w-[90%] p-6 relative overflow-y-auto max-h-[80vh]">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-black text-xl font-bold"
              >
                ✕
              </button>

              {/* Album title */}
              <h2
                className="mb-4 text-2xl text-neutral-900 font-bold text-center"
                style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
              >
                {title}
              </h2>

              {/* Grid of images */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt={`Photo ${i}`}
                    className="rounded-xl shadow-md"
                    whileHover={{ scale: 1.05 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AlbumsSection = () => (
  <section className="py-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {albums.map((album, i) => (
        <CollapsibleAlbum key={i} title={album.title} images={album.images} />
      ))}
    </div>
  </section>
);


const totalHours = data.reduce((sum, item) => sum + item.callHours, 0);
const totalImages = data.reduce((sum, item) => sum + item.images, 0);



export default function App() {
  const firstChartRef = useRef(null);
  const secondChartRef = useRef(null);

  const isFirstChartInView = useInView(firstChartRef, {
    margin: "0px 0px -20% 0px",
    amount: 0.5,
    once: false,
  });

  const isSecondChartInView = useInView(secondChartRef, {
    margin: "0px 0px -20% 0px",
    amount: 0.5,
    once: false,
  });

  // const [selectedImage, setSelectedImage] = useState(null);
  const timelineRefs = useRef([]);

  const ref_bdcard = useRef(null);
  const isInView_bdcard = useInView(ref_bdcard, { once: true });
  
  return ( 

      <div className="bg-[#3A4D39] text-[#F0EAD6] min-h-screen font-sans overflow-x-hidden">
      <section className="h-screen flex items-center justify-center text-center">
        <SparkleGroup count={10} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="text-4xl md:text-6xl font-bold text-[#E1C699]"
        >
          🎂 Happy Birthday, Love 💖
        </motion.div>
        
      </section>

      <section className="min-h-screen bg-[#3A4D39] text-forest-900 py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mustard-600">
          During the past year ✈️
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1,  scale: 1 }}
          transition={{ duration: 2, ease: "easeOut"}}
          viewport={{ once: false, amount: 0.5 }}
          className="w-full md:w-1/2 mx-auto"
        >
          <TogetherPie />
        </motion.div>
       
        

        <div className="relative border-l-4 border-mustard-500 pl-6 space-y-10 max-w-2xl mx-auto">
          {[
            {
              date: "July 2024",
              location: "New York 🏙️",
              daystogether: "6 days~~",
              memory: "Moving back to NYC!",
              image: `${process.env.PUBLIC_URL}/images/timeline/24_jul_nyc.jpg`,
            },
            {
              date: "July 2024",
              location: "Pittsburgh 🌉",
              daystogether: "3 days~~",
              memory: "Finally visited CMU ❤️ - and magically, I was only sick on the conference day!",
              image: `${process.env.PUBLIC_URL}/images/timeline/24_jul_pitts.jpg`,
            },
            {
              date: "August 2024",
              location: "Vancouver 🏡",
              daystogether: "10 days~~",
              memory: "You came back right away — home sweet home~",
              image: `${process.env.PUBLIC_URL}/images/timeline/24_aug_van.jpg`,
            },
            {
              date: "September 2024",
              location: "Vancouver 🏞",
              daystogether: "10 days~~",
              memory: "Whale watching with dad!",
              image: `${process.env.PUBLIC_URL}/images/timeline/24_sep_van.jpg`,
            },
            {
              date: "October 2024",
              location: "Vancouver 🏡",
              daystogether: "6 days~~",
              memory: "Kriam is here 🌟",
              image: `${process.env.PUBLIC_URL}/images/timeline/24_oct_van.jpg`,
            },
            {
              date: "December 2024 - January 2025",
              location: "Vancouver 🎄",
              daystogether: "36 days!!",
              memory: "Back home for the chilled holidays~~~",
              image: `${process.env.PUBLIC_URL}/images/timeline/24_dec_van.jpg`,
            },
            {
              date: "March 2025",
              location: "Vancouver 🏡",
              daystogether: "9 days~~",
              memory: "Longest time away ... but spring break finally came!!!",
              image: `${process.env.PUBLIC_URL}/images/timeline/25_mar_van.jpg`,
            },
            {
              date: "April 2025",
              location: "NYC again 🗽",
              daystogether: "7 days~~",
              memory: "All the paperwork... but we finally made it to the Comedy Cellar!",
              image: `${process.env.PUBLIC_URL}/images/timeline/25_apr_nyc.jpg`,
            },
            {
              date: "May 2025",
              location: "Back home 🏡",
              daystogether: "11 days so far~~",
              memory: "Yeah~ Welcome home, my 顺毛小狗~~~",
              image: `${process.env.PUBLIC_URL}/images/timeline/25_may_van.jpg`,
            },

          ].map((visit, index) => (
            <motion.div
              key={index}
              ref={el => timelineRefs.current[index] = el}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              // initial="hidden"
              // whileInView="visible"
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.6 }}
              className="relative pl-5 pb-5 border-l-2 border-mustard-400
              bg-[#E1C699]/70 p-5 rounded-xl shadow-md"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: index * 0.1 } },
              }}
             
            >
              {/* Timeline dot */}
              <div className="absolute -left-[1.25rem] top-1 w-4 h-4 
              bg-mustard-400 rounded-full border-4 border-[#E1C699] shadow-md" />
             
             {/* Timeline content */}
                {/* Left (Text content) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-mustard-300 
                text-forest-900 p-5 rounded-xl shadow-md">
                  {/* Left column: text */}
                  <div>
                    <h3 className="text-md font-semibold italic text-forest-800">{visit.date} - {visit.daystogether}</h3>
                    <h3 className="mt-1 text-sm font-semibold text-forest-800">{visit.location}</h3>
                    <p className="mt-5 text-forest-700 text-xl leading-relaxed font-hand">{visit.memory}</p>
                  </div>
              
                  {/* Right column: image */}
                  {visit.image && (
                    <div className="flex justify-center items-center">
                      <img
                        src={visit.image}
                        alt={`${visit.location} memory`}
                        className="rounded-xl shadow-md rotate-1 max-h-72 object-cover"
                      />
                    </div>
                    )}
                </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      <section ref={firstChartRef} className="h-screen p-10">
        <h2 className="text-3xl mb-6 text-[#F0EAD6] font-bold text-center">Hours We Call Each Month 📞</h2>
        <p className="text-xl text-[#F0EAD6] mb-4">
          We called each other <span className="font-bold text-[#E1C699]">{totalHours}</span> hours
          during this past year — and every second was worth it 💬💛
        </p>
        {isFirstChartInView && (
            <>
            {/* <SparkleGroup count={10} /> */}
            <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}
            // viewport={{ once: false }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="month" stroke="#F0EAD6" />
                  <YAxis stroke="#F0EAD6" />
                  <Tooltip />
                  <Bar dataKey="callHours" fill="#E1C699" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
            </>
        )}
      </section>

      <section ref={secondChartRef} className="h-screen p-5">
        <h2 className="text-3xl mb-6 text-[#F0EAD6] font-bold text-center">Images We Sent Each Month 📸</h2>
        <p className="text-xl text-[#F0EAD6] mb-4">
          We sent <span className="font-bold text-[#E1C699]">{totalImages}</span> images 
          during the past year — memories, silly faces, and everyday moments ✨💛
        </p>
        {isSecondChartInView && (
          <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 3}}
          // viewport={{ once: false }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="month" stroke="#F0EAD6" />
                <YAxis stroke="#F0EAD6" />
                <Tooltip />
                <Bar dataKey="images" fill="#E1C699" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </section>

      <section className="min-h-screen bg-[#3A4D39]">
        <h2 className="text-3xl -my-5 mb-12 text-mustard-500 font-bold text-center">
          And more during the past year 💛
        </h2>
        <AlbumsSection />
       
      </section>
      
      <section className="relative min-h-screen bg-[#3A4D39]">
        <SparkleGroup count={10} />
        <motion.section 
          ref={ref_bdcard}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView_bdcard ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative bg-[#3A4D39] max-w-3xl mx-auto -my-16 
          pt-36 md:pt-0 px-8 py-16 text-center">
          
          <div className="relative inline-block">
            <div
              className="bg-yellow-100/80 text-black px-6 py-4 rounded-2xl shadow-lg
              text-2xl font-semibold"
              style={{
                fontFamily: "'Gloria Hallelujah', cursive",
                textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
              }}
            >
              Happy Birthday again 💛
              <p className="mt-4 text-xl">
                This past year hasn’t been easy for either of us, but I truly believe we’ve 
                both grown so much — and that makes me incredibly proud of us. Thank you for 
                being my person, my constant, and for helping me become someone I like more 
                when I’m with you. 
              </p>
              <p className="mt-4 text-xl">
                This year has made me cherish every day we’ve spent together 
                even more deeply, and it’s also made me realize just how much I miss you when 
                we’re apart. 
                I’m so excited for everything ahead and I can’t wait for our next chapter to begin!!!

              </p>
              <p className="mt-4 text-xl">Thank you for being part of my life. 🎂🎈</p>
            </div>

            {/* Optional sticker-style label */}
            <div
              className="absolute -top-6 -left-4 rotate-[-6deg] bg-red-200/90 
              text-black px-3 py-1 rounded-lg shadow-md font-bold text-md"
              style={{
                fontFamily: "'Gloria Hallelujah', cursive",
                textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
              }}
            >
              Finally, to my dearest 小宝宝
            </div>
          </div>
        </motion.section>
      </section>


    </div>

    
  );
}