import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="absolute left-0 right-0 pt-16 bg-footer">
      <div className="container">
        <div className="xl:flex gap-3 justify-between mb-16">
          {/* about */}
          <div className="xl:max-w-[700px] mb-8 xl:mb-0">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-[#97989F]">
              <span className="text-text">GameAtlas</span> — це енциклопедія для справжніх геймерів. Тут ви знайдете пояснення ігрових жанрів, термінів, а також особисті роздуми про улюблені ігри. Ми також тримаємо вас у курсі останніх новин зі світу відеоігор. Відкривайте нові горизонти в ігровому світі разом із нами!
            </p>
          </div>

          {/* links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="mb-3">
              <li>
                <Link
                  href="https://t.me/GameAtlasOfficial"
                  className="text-[#97989F] hover:text-accent"
                  target="blank"
                >
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* logo */}
        <div className="py-8 border-t border-[#242535] flex justify-center">
          <Link
            href="/"
          >
            <Image
              src="/assets/Logo-bg.svg"
              className="max-w-[150px] md:max-w-[190px]"
              width={190}
              height={36}
              alt="logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
};

export default Footer;