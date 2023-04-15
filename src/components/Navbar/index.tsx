import images from 'assets';
import CustomButton from 'components/CustomButton';
import CustomModal from 'components/CustomModal';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useSpring, animated, useTransition, config } from 'react-spring';

const Navbar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const animationSidebar = useSpring({
    to: {
      opacity: isMobileSidebarOpen ? 1 : 0,
      transform: isMobileSidebarOpen ? 'translateX(0%)' : 'translateX(100%)',
    },
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTablet = useMediaQuery({
    minWidth: '768px',
    maxWidth: '1023px',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const handleOpenSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      <div className="px-4 py-4 transition-all flex justify-between items-center font-medium border-b border-muted">
        <div className="flex items-center gap-12">
          <Link to="/">
            <img
              src={images.logo}
              alt="Remitano"
              className="w-[3.25rem] md:w-[4rem]"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 xl:gap-12">
          {isDesktop && (
            <Link to="/login">
              <CustomButton className="custom-button-shadow">
                Login / Register
              </CustomButton>
            </Link>
          )}
          {!isDesktop && (
            <img
              src="/images/Hamburger.svg"
              alt="Remitano"
              className="w-[2rem] h-[2rem]"
              onClick={() => {
                handleOpenSidebar();
              }}
            />
          )}
        </div>
      </div>
      {!isDesktop &&
        createPortal(
          <>
            <animated.div
              style={animationSidebar}
              className="fixed z-[100000] top-0 left-0 bottom-0 mx-0 px-0"
              // ref={ref}
            >
              <div className="h-full w-full">
                <div className="z-[100000] w-[100svw] h-[100svh] overflow-auto bg-neutral-100 flex flex-col">
                  <div className="px-6 py-5 flex justify-between border-b border-neutral-300">
                    <Link to="#">
                      <img
                        src="/images/Logo.svg"
                        alt="Remitano"
                        className="md:w-[4rem] h-[2.5rem] md:h-[3rem] 2xl"
                      />
                    </Link>
                    <img
                      src="/images/Navbar_Close.svg"
                      alt="Remitano"
                      className="md:w-[4rem] h-[2.5rem] md:h-[3rem] 2xl"
                      onClick={() => {
                        handleCloseSidebar();
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-14 flex flex-col gap-6">
                      <a
                        href="#introduction"
                        className="text-neutral-black tracking-minus-01"
                        onClick={() => {
                          handleCloseSidebar();
                        }}
                      >
                        Giới thiệu chung
                      </a>
                      <a
                        href="#interaction"
                        className="text-neutral-black tracking-minus-01"
                        onClick={() => {
                          handleCloseSidebar();
                        }}
                      >
                        Chức năng
                      </a>
                      <a
                        href="#preview"
                        className="text-neutral-black tracking-minus-01"
                        onClick={() => {
                          handleCloseSidebar();
                        }}
                      >
                        Phụ kiện
                      </a>
                      <a
                        href="#dropdown"
                        className="text-neutral-black tracking-minus-01"
                        onClick={() => {
                          handleCloseSidebar();
                        }}
                      >
                        Hướng dẫn sử dụng
                      </a>
                      <a
                        href="#faq"
                        className="text-neutral-black tracking-minus-01"
                        onClick={() => {
                          handleCloseSidebar();
                        }}
                      >
                        FAQ
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </animated.div>
          </>,
          document.body
        )}
    </>
  );
};

export default Navbar;
