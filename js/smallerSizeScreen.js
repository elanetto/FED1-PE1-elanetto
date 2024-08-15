// create a burger menu for smaller screens
        const burger = document.getElementById('burger');
        const nav = document.getElementById('nav');
        const body = document.querySelector('body');
        const navLinks = document.querySelectorAll('.nav-link');
        const navLinksArray = Array.from(navLinks);
        const navLinksArrayLength = navLinksArray.length;
        let isNavOpen = false;

        burger.addEventListener('click', () => {
            if (isNavOpen) {
                nav.style.display = 'none';
                body.style.overflow = 'auto';
            } else {
                nav.style.display = 'flex';
                body.style.overflow = 'hidden';
            }
            isNavOpen = !isNavOpen;
        }
        );

        navLinksArray.forEach((link) => {
            link.addEventListener('click', () => {
                nav.style.display = 'none';
                body.style.overflow = 'auto';
                isNavOpen = false;
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.style.display = 'flex';
            } else {
                nav.style.display = 'none';
            }
        });



