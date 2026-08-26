document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.product_info-container');

    containers.forEach((container) => {
      const tabs = container.querySelectorAll('.product_info-tab');
      const panels = container.querySelectorAll('.product_info-panel');

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          const targetPanel = container.querySelector(`.product_info-panel[data-panel="${target}"]`);

          if (!targetPanel) return;

          const isMobile = window.innerWidth <= 768;

          // Mobile accordion behavior
          if (isMobile) {
            const isCurrentlyActive = targetPanel.classList.contains('is-active');

            // Close all panels instantly
            panels.forEach((panel) => {
              const content = panel.querySelector('.product_info-content');

              panel.classList.remove('is-active');

              if (content) {
                content.style.transition = 'none';
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
              }
            });

            tabs.forEach((t) => t.classList.remove('is-active'));

            // If clicking already-open panel, stop here (close it)
            if (isCurrentlyActive) {
              return;
            }

            // Restore transitions
            requestAnimationFrame(() => {
              panels.forEach((panel) => {
                const content = panel.querySelector('.product_info-content');

                if (content) {
                  content.style.transition = 'max-height .4s ease, opacity .3s ease';
                }
              });

              tab.classList.add('is-active');
              targetPanel.classList.add('is-active');

              const content = targetPanel.querySelector('.product_info-content');

              if (content) {
                content.style.maxHeight = `${content.scrollHeight}px`;
                content.style.opacity = '1';
              }
            });
            return;
          }
          tabs.forEach((t) => t.classList.remove('is-active'));
          panels.forEach((panel) => panel.classList.remove('is-active'));

          tab.classList.add('is-active');
          targetPanel.classList.add('is-active');
        });
      });
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        document.querySelectorAll('.product_info-panel.is-active .product_info-content').forEach((content) => {
          content.style.maxHeight = `${content.scrollHeight}px`;
        });
      } else {
        document.querySelectorAll('.product_info-content').forEach((content) => {
          content.style.maxHeight = '';
          content.style.opacity = '';
          content.style.transition = '';
        });
      }
    });
  });