
document.addEventListener('DOMContentLoaded', function() {
  const progressBars = document.querySelectorAll('.progress');
  
  progressBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage');
    bar.style.setProperty('--percentage', `${percentage}%`);
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Thank you for your message. It has been sent successfully!');
                form.reset();
            } else {
                alert('Oops! There was a problem submitting your form. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem submitting your form. Please try again.');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress');
    const radialBars = document.querySelectorAll('.circle .bar');
    const percentages = document.querySelectorAll('.percentage');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress')) {
                    animateProgressBar(entry.target);
                } else if (entry.target.classList.contains('bar')) {
                    animateRadialBar(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
    radialBars.forEach(bar => observer.observe(bar));

    function animateProgressBar(bar) {
        const percentage = bar.getAttribute('data-percentage');
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 100);
    }

    function animateRadialBar(bar) {
        const percentage = bar.getAttribute('data-percentage');
        const circumference = bar.getTotalLength();
        const offset = circumference - (circumference * percentage / 100);
        
        bar.style.strokeDasharray = circumference;
        bar.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            bar.style.strokeDashoffset = offset;
        }, 100);

        // Animate percentage text
        const percentageElement = bar.closest('.circle').querySelector('.percentage');
        animatePercentage(percentageElement, percentage);
    }

    function animatePercentage(element, targetPercentage) {
        let currentPercentage = 0;
        const duration = 2000; // 2 seconds
        const step = targetPercentage / (duration / 16); // 60 fps

        function updatePercentage() {
            currentPercentage += step;
            if (currentPercentage < targetPercentage) {
                element.textContent = Math.round(currentPercentage) + '%';
                requestAnimationFrame(updatePercentage);
            } else {
                element.textContent = targetPercentage + '%';
            }
        }

        requestAnimationFrame(updatePercentage);
    }
});