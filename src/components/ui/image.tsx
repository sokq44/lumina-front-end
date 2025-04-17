import { motion } from "framer-motion";
import { DetailedHTMLProps, forwardRef, ImgHTMLAttributes } from "react";

export type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const StaticImg = forwardRef<HTMLImageElement, ImgProps>((props, ref) => {
  return <img ref={ref} loading="lazy" {...props} />;
});
const Img = motion.create(StaticImg);

export default Img;
