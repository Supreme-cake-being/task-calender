import axios from "axios";
import { Calender } from "src/components/Calender/Calender";

export default async function Home() {
  const date = new Date();

  const countries = await axios.get(process.env.NEXT_PUBLIC_API + "/countries");
  const holidays = await axios.get(process.env.NEXT_PUBLIC_API + "/holidays", {
    params: { year: date.getFullYear(), countryCode: "UA" },
  });

  return <Calender holidays={holidays.data} />;
}
