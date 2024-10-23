import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "react-bootstrap/Card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";

const CategoryCards = () => {
  const { val } = useParams();
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(
      `/events?city=${val}&category=${e.currentTarget.getAttribute("value")}`
    );
  };
  return (
    <div className="mx-2 my-10">
      <Carousel className=" mx-14 lg:mx-96">
        <h1 className="mb-4 text-xl">
          <i className="fa-solid fa-fire"></i> EXPLORE
        </h1>
        <CarouselPrevious className="lg:hidden" />
        <CarouselContent>
          {[
            {
              img: "https://img.freepik.com/free-vector/flat-geometric-craft-youtube-thumbnail-template_23-2148914046.jpg",
              value: "Art",
            },
            {
              img: "https://www.videoconverterfactory.com/tips/imgs-self/download-comedy-videos/download-comedy-videos-1.jpg",
              value: "Comedy",
            },
            {
              img: "https://img-cdn.pixlr.com/pixlr-templates/6262037012194f3766ee039d/preview.webp",
              value: "Music",
            },
            {
              img: "https://i.pinimg.com/originals/49/2d/d4/492dd4c48438c7e79016f3819f35393d.jpg",
              value: "Courses",
            },
            {
              img: "https://cdn-az.allevents.in/events1/banners/40ea8b323041e09e00e2905e6cb48e2b5b19e318ccbc8237a2e78627036f0b80-rimg-w1200-h630-dc150608-gmir?v=1716937264",
              value: "Gathering",
            },
            {
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeClAQM58Ibh3Ikek5DF4X9XRlO11TnuaEQA&s",
              value: "Pocket-friendly",
            },
          ].map((category, index) => {
            return (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/6 cursor-pointer"
                onClick={handleClick}
                value={category.value}
              >
                <Card className="bg-dark text-white">
                  <Card.Img
                    src={category.img}
                    alt={category.value}
                    className="h-28"
                  />
                  <Card.ImgOverlay>
                    <Badge variant="secondary">{category.value}</Badge>
                  </Card.ImgOverlay>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext className="lg:hidden" />
      </Carousel>
    </div>
  );
};

export default CategoryCards;
