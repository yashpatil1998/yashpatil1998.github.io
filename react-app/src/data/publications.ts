export type Publication = {
  title: string
  summary: string
  venue: string
  year: string
  url: string
  logo?: string
}

export const publications: Publication[] = [
  {
    title: "American and Indian Sign Language Translation using Computer Vision",
    summary: "Translation system bridging American and Indian Sign Languages using computer vision techniques.", 
    venue: "SSRN Elsevier",
    year: "2020",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3709073",
    logo: "https://img.logo.dev/ssrn.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg"
  },
  {
    title: "AI-Enabled Real-Time Sign Language Translator",
    summary: "Real-time android application for translating sign language to text using CNNs.",
    venue: "Springer - Soft Computing: Theories and Applications",
    year: "2020",
    url: "https://link.springer.com/chapter/10.1007/978-981-15-4032-5_33",
    logo: "https://img.logo.dev/springer.com?token=pk_UNjh2tfPRpGeBWAnvuKbAg"
  },
  {
    title: "Intelligent Blood Management System", 
    summary: "IoT-based system for efficient management and tracking of blood banks and donations.",
    venue: "IEEE - Bombay Section Signature Conference", 
    year: "2020",
    url: "https://ieeexplore.ieee.org/document/8973008",
    logo: "https://img.logo.dev/ieee.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg"
  },
  {
    title: "Vehicle Number Plate Detection using Convolutional Neural Networks",
    summary: "Automated license plate recognition system utilizing Convolutional Neural Networks.",
    venue: "Asian Journal of Convergence in Technology",
    year: "2019",
    url: "https://www.asianssr.org/index.php/ajct/article/view/868",
    logo: "https://img.logo.dev/asianssr.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg"
  },
  {
    title: "Cellular Device Detection in Restricted Premises",
    summary: "System for detecting unauthorized cellular devices in restricted areas.",
    venue: "IEEE - Global Conference for Advancement in Technology",
    year: "2019",
    url: "https://ieeexplore.ieee.org/document/8978318",
    logo: "https://img.logo.dev/ieee.org?token=pk_UNjh2tfPRpGeBWAnvuKbAg"
  },
  {
    title: "Basic Logic Gate Detector using ATmega328P and Android App",
    summary: "Android app interfacing with ATmega328P to detect and verify logic gate operations.",
    venue: "Helix - The Scientific Explorer",
    year: "2019",
    url: "http://helix.dnares.in/2019/07/01/basic-logic-gate-detector-using-atmega328p-and-android-app/",
    logo: "https://img.logo.dev/helix.dnares.in?token=pk_UNjh2tfPRpGeBWAnvuKbAg"
  }
]
