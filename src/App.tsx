import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Menu, X } from 'lucide-react';
import Map from './components/Map';
import './i18n/i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <img
                src="public\images\cliniclogo.jpg" 
                alt="Clinic Logo"
                className="h-20 w-40"
              />
              {/* Title and subtitle */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800 px-4">{t('header.title')}</h1>
                <p className="text-gray-600 px-5">{t('header.subtitle')}</p>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-6 items-center">
              <nav className="flex space-x-6">
                <a href="#about" className="text-gray-600 hover:text-gray-900 px-4 ">{t('nav.about')}</a>
                <a href="#services" className="text-gray-600 hover:text-gray-900">{t('nav.services')}</a>
                <a href="#locations" className="text-gray-600 hover:text-gray-900">{t('nav.locations')}</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900">{t('nav.contact')}</a>
              </nav>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t('header.switchLanguage')}
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-4">
              <a href="#about" className="text-xl text-gray-600 hover:text-gray-900">{t('nav.about')}</a>
              <a href="#services" className="text-xl text-gray-600 hover:text-gray-900">{t('nav.services')}</a>
              <a href="#locations" className="text-xl text-gray-600 hover:text-gray-900">{t('nav.locations')}</a>
              <a href="#contact" className="text-xl text-gray-600 hover:text-gray-900">{t('nav.contact')}</a>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
              >
                {t('header.switchLanguage')}
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80"
            alt="Medical facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('header.title')}</h1>
              <p className="text-xl md:text-2xl">{t('header.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t('about.title')}</h2>
            <p className="text-lg text-xl mb-14">{t('about.description')}</p>
            <div className="text-xl grid md:grid-cols-2 gap-10">
              <ul className="space-y-10 py-20">
                {(t('about.qualifications', { returnObjects: true }) as string[]).map((qual: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {qual}
                  </li>
                ))}
              </ul>
              <img
                src="public\images\doctor.jpg"
                alt="Doctor"
                className="rounded-lg shadow-lg h-[600px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t('services.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(t('services.items', { returnObjects: true }) as Array<{ title: string; description: string }>).map(
                (service, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t('locations.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Clinic 1 */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">{t('locations.clinic1.name')}</h3>
                <p className="text-xl flex items-center mb-4">
                  <MapPin className="mr-2" />
                  {t('locations.clinic1.address')}
                </p>
                <p className='text-xl mb-4'>{t('locations.clinic1.phone')}</p>
                <p className='text-xl mb-4'>{t('locations.clinic1.mobile')}</p>
                <p className="text-xl mb-6">{t('locations.clinic1.hours')}</p>
                <Map
                  center={{ lat: 30.059915889473828, lng: 31.2441999000009 }}
                  locations={[
                    {
                      lat: 30.059915889473828,
                      lng: 31.2441999000009,
                      title: t('locations.clinic1.name'),
                    },
                  ]}
                />
              </div>

              {/* Clinic 2 */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">{t('locations.clinic2.name')}</h3>
                <p className="text-xl flex items-center mb-2">
                  <MapPin className="mr-2" />
                  {t('locations.clinic2.address')}
                </p>
                <p className='text-xl mb-4'>{t('locations.clinic2.phone')}</p>
                <p className='text-xl mb-4'>{t('locations.clinic2.mobile')}</p>
                <p className="text-xl mb-8">{t('locations.clinic2.hours')}</p>
                <Map
                  center={{ lat: 30.101273204872736, lng: 31.3429167 }}
                  locations={[
                    {
                      lat: 30.101273204872736,
                      lng: 31.3429167,
                      title: t('locations.clinic2.name'),
                    },
                  ]}
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">{t('locations.clinic3.name')}</h3>
                <p className="text-xl flex items-center mb-6">
                  <MapPin className="mr-2" />
                  {t('locations.clinic3.address')}
                </p>
                <p className='text-xl mb-6'>{t('locations.clinic3.phone')}</p>
                <p className="text-xl mb-20">{t('locations.clinic3.hours')}</p>
                <Map
                  center={{ lat: 30.0794047890793,  lng: 31.374622544909926 }}
                  locations={[
                    {
                      lat: 30.0794047890793,
                      lng: 31.374622544909926,
                      title: t('locations.clinic3.name'),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">{t('contact.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center">
                <Phone className="mr-4" />
                <div>
                  <h3 className="font-semibold mb-2">{t('contact.phone')}</h3>
                  <p>+2 01223535409</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="mr-4" />
                <div>
                  <h3 className="font-semibold mb-2">{t('contact.email')}</h3>
                  <p>drmagedadly@yahoo.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
