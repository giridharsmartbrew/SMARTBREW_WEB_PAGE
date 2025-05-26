import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  content?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future Salesperson",
    excerpt: "They don't push-deals. They read the signals - and create a human network.",
    category: "Sales",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/blog/Blog1.png",
    author: {
      name: "Neeharika Kaila",
      avatar: "/Employees/Neeharika.jpg"
    },
    content: `Let's be real for a second.
You want to win. You want your ideas heard, your projects funded, your career to take off. You want to be known, followed, respected.
You want to succeed.
But when someone says the word "sales", you flinch.
It feels… pushy. Fake. Outdated. Like a cold call from another era.
Here's the catch:
You can't succeed without learning how to sell.
Not just in business - in life.

The Tug of War You're Playing
Every time you dream big, but refuse to pitch your idea…
Every time you want people to believe in you, but won't ask for their attention…
Every time you want to grow, but avoid the discomfort of putting yourself out there…
You're in a silent tug of war with yourself.
You want the outcome - but reject the path.
You want to rise - but resist the skill that gets you there: sales.

But Wait - What Is Sales?
It's not talking someone into buying a product they don't need.
It's not tricking. Or chasing. Or pretending.
Sales is building relationships.
Sales is making people believe.
Sales is understanding someone's world - and showing them how you can add value to it.
Every time you apply for a job, pitch a startup, build a brand, promote a cause, or even ask someone on a date - you're selling.
The question is:
Are you doing it well?

Gen Z, Here's the Truth
You already have the edge. You're emotionally aware. You're digitally fluent. You value authenticity. You know when someone's being real - and when they're just performing.
Now imagine pairing that with the ability to:
Pitch without pressure
Connect without pretending
Influence without manipulating
That's not just sales. That's self-mastery.

So… Do You Want to Succeed?
Then here's the mirror you need to look into:
Do you want to succeed?
Then you need to learn how to sell.
Do you want to sell?
Then you need to see it for what it really is:
A tool. A superpower. A way of building something that matters - with people who care.

Your ideas are worth hearing.
Your future is worth pitching.
Your relationships are worth investing in.
So stop pulling against yourself.
Align. Sell. Succeed.`
  },
  {
    id: 2,
    title: "Imagining NATURIEM",
    excerpt: "What if money didn't just measure value… but created it.",
    category: "Social Impact",
    date: "March 18, 2024",
    readTime: "6 min read",
    image: "/blog/Blog2.png",
    author: {
      name: "Himanshu Pandey",
      avatar: "/Employees/Himamshu Pandey CEO.png"
    },
    content: `Imagining NATURIEM: A Currency for an Equitable and Living World. What if money didn't just measure value… but created it?

What if, instead of extracting from the Earth and dividing us further, our currency could heal the planet and bring us closer together?

This is not science fiction. This is an idea whose time has come.

A World of Unequal Odds

We live in a deeply divided world.
Some live with too much, many live with too little - and nature, our one shared home, continues to pay the price for our progress.

We transact every day - buying, selling, consuming - often without questioning the systems we feed. But behind every smooth payment is a long, uneven story of exploitation, inequality, and loss.

The odds are stacked. Against the poor. Against biodiversity. Against future generations.

What if we could flip that?

Enter: NATUREIUM

NATUREIUM is not a real currency - yet. It's an imagined one.
A cryptocurrency born from the belief that we need to rethink how we assign value in this world.

What makes NATURIEM different?
It rewards regeneration, not just consumption
It grows in places where people and planet thrive - together
It is mined not by machines, but by acts of balance: conserving forests, supporting communities, protecting life

In a world built on extraction, NATURIEM imagines a system built on care and contribution.

A Transaction Worth Making

Imagine a world where planting a tree is a transaction. Where protecting a river earns you credit. Where giving time to educate, heal, or restore is as valuable as buying or selling.

NATURIEM flips the logic of currency.
It sees value where today's systems see none. It rewards care, not just capital. Stewardship, not just speed.

It doesn't erase money. It reimagines its purpose.

You + Me = Possibility

NATURIEM isn't something a bank can issue or a government can control. It begins with imagination. And is powered by intention.

It can only be established by you and me - by people who believe another world is possible and are willing to co-create it.

So, will people join me?
Not just in dreaming, but in designing?
Not just in hoping, but in helping?

Let's build a currency that restores balance.
Let's make the future worth transacting in.

Let's imagine NATURIEM - and make it real.`
  },
  {
    id: 3,
    title: "See Tomorrow. Act Today",
    excerpt: "Building a window into the future we still have time to create.",
    category: "Social Impact",
    date: "March 20, 2024",
    readTime: "8 min read",
    image: "/blog/Blog3.png",
    author: {
      name: "Himanshu Pandey",
      avatar: "/Employees/Himamshu Pandey CEO.png"
    },
    content: `iChange: App that saves the future! 

Stephen sat at the very edge of his seat. His fingers danced the quickstep over the keyboard as he hunched over his computer, eyes never leaving the screen. He was nearing the end of his special project and couldn't wait to test it out. With the swipe of a finger, his timebot would be able to instantly take the world ten years forward in time.

Stephen hadn't invented a time machine, though – just a lens to show a dying world what it was capable of.

For the last three years, he had been researching, designing, coding – developing, Visio. Visio, if it worked, would revolutionize the way the world saw itself; would question reality itself. And what was reality anyway, but a projection of the mind, thought Stephen. The human mind was capable of not only feeling, but also blocking sensations of pain, capable of imagining water in a desert where there was none… of slowing down bodily functions through meditation. The human mind was even capable of imagining an alternate reality altogether – the future.

The mind can play its clever tricks on you, thought Stephen, but what is truly real is that which touches the heart. The thought took him back briefly to a moment in the past – he had been on Level 9 of the Marauders of the Ancient Ark, when the phone had been gently, but firmly, taken from his hands by his father. He'd protested and looked up at his father, who only smiled and motioned with his chin to something up ahead. He'd looked, unwilling – and gasped audibly. Up ahead in the clearing in the forest, just ahead of their safari jeep, stood a tigress, straight-backed and regal. Two steps behind her, chasing each other's tails, were her three little cubs. The tigress looked towards their jeep, her piercing eyes assessing them; then, with a dismissive turn of her head, she continued to walk across the flat grass, her cubs now alert and bounding after her. The moment was one of a grace and beauty that Stephen had never thought possible and had never again experienced.

That trip to the National Park had sparked something – Stephen started looking up. He saw people plugged into their little screens, tangled in wires and themselves – heads bent over their phones and tabs like praying mantis; if a stegosaurus were to be struck by a meteorite and collapsed in front of them with an earth-shattering crash, they wouldn't even know. Stephen hadn't traded away his console, but his energies were now focused on changing the game.

Done! He exclaimed to himself as he punched in the last strands of code and stood up, hands stretched high up in air. He hadn't slept in three days, pushing his body to cooperate with his racing mind. One last thing now – he strode over to the table and opened the window, filling the room with crimson light. Outside his penthouse apartment, the air was thick with smoke and the sounds of the street wafted up to him. Stephen dragged his work table to the window and set up the tripod on it.

Carefully, he placed the console screen on it and focused on the scene outside the open window - thick clouds of angry, grey smoke and tops of even greyer buildings. The heat was visible in waves and Stephen winced and squinted. Now he positioned himself behind the console and, his heart thudding against his chest, pushed the power button.

Nothing happened.

The device appeared to be on, but showed no change. Stephen frowned and leaned closer to the screen, examining it with a tinge of gloom. But there in the corner, in tiny luminous green numbers, the date read - 10 June 2030. With a salty smidgen of hope, Stephen almost tripped on his own feet in his haste as he picked up the birdbath from the corner of the room where it had waited patiently. Carefully, he placed it on the window sill, filled it with some water from a bottle and quickly took up his position behind the screen again.

As Stephen watched, the screen flickered for a just second. Then, an orange spark settled itself on the birdbath and was joined by another, and another – soon the birdbath was full of tiny orange and gold twittering digital birds, filling the speakers with birdsong. Before his eyes, tiny green digital plants began to sprout along the building edges and the grey clouds on the screen began to clear, revealing baby blue skies. In one corner of the screen, the data poured in – 550 bird trips to and fro, 300% increase in bird population, 400% increase in tree cover, 100% improved air quality and visibility, noise levels… Stephen blinked. He let out a little laugh, mopping his forehead and relaxing his shoulders. Visio was a success!

Outside of the screen, the grey skies and orange birdbath remained unfazed, ignorant of the transformation their screen selves were seeing. With Visio, Stephen could sell possibility and hope – "Turn on the screen to see the potential of every little act in real time!" "The future in your pocket – backed by science and math!" "Bring back the Earth – let Visio tell you how!"

Stephen closed his eyes and smiled to himself.

What started as a thought captured in this imagined piece, Himanshu Pandey paints a future where technology doesn't just simulate change - it catalyzes it. This isn't just fiction - it's a vision he deeply believes in, and one he's now working to bring to life by building systems that create measurable, real-world impact. What if we could see the difference our actions make, before they're even made?

x.com/hidigit is a builder of systems, dreamer of equitable futures, and believer in the power of purposeful technology to transform how we live, work, and connect.`
  },
  {
    id: 4,
    title: "The Machines Are Here - But So Is the Moment",
    excerpt: "Why AI, IoT, and Robotics Will Change the World Forever",
    category: "Technology",
    date: "March 22, 2024",
    readTime: "10 min read",
    image: "/blog/Blog4.png",
    author: {
      name: "Giridhar Chennuru",
      avatar: "/Employees/Giridhar.jpg"
    },
    content: `We are standing at the edge of one of the most profound inflection points in human history.
Artificial Intelligence, the Internet of Things, and Robotics - once the subjects of science fiction and speculation - are no longer waiting on the horizon. They're here. They're learning, listening, moving, evolving. Quietly, pervasively, they are transforming the systems that run our homes, cities, schools, businesses, hospitals - even battlefields.
These technologies are beginning to redefine how we live, learn, work, heal, govern, move, and dream.
And yes, even how we wage war and negotiate peace.
It's a thrilling moment.
But also an unsettling one.
Because behind the promise of hyper-productivity, seamless automation, and predictive everything, lies a deeper question:
Who is shaping this future? And who is it being shaped for?

Should Technology Shape the World?
The answer depends on who you ask - because the world isn't one voice. It's a chorus of lived realities. Here's how we might hear the responses if we truly listened:

The Practical Optimist
"It already does, doesn't it?"
This is the convenience-first majority - urban and semi-urban users in both developed and emerging economies.
For them, tech simplifies life. It's maps, banking, learning, groceries - all in one device. If it saves time and offers control, what's not to like?
~35% of the world falls into this group. Digitally enabled, but often indifferent to the deeper implications.

The Underserved & Disconnected
"Maybe it shapes the world, but not mine."
This is the other side of the digital divide - rural, displaced, or economically marginalized communities.
They still struggle for stable connectivity, healthcare, opportunity. For them, tech often feels like a tool for the rich. A language spoken in another room.
According to the GSMA Mobile Economy Report (2023):
30% of the global population is still offline, and another 15% live under internet coverage but don't use it - often due to affordability, literacy, or trust barriers.
These 2.5 billion+ people aren't just offline. They're at risk of being left behind in the future being engineered without them.

The Cautious Parent
"They're always online. It worries me."
This group - parents, educators, older millennials - questions not the presence of technology, but its price.
They worry about fractured attention, declining mental health, and a fading sense of human connection. For them, tech is a paradox: helpful, but also hollowing.
~15% globally, this group represents the cultural and emotional conscience of the connected world.

The Working-Class Professional
"It's taking our jobs."
Blue- and white-collar workers, especially in manufacturing, retail, customer support, or logistics, are experiencing the harshest edge of automation.
They've seen machines arrive, roles shrink, and futures become uncertain.
10% fall into this category - often digitally capable, but increasingly displaced or deskilled by technology designed for cost, not community.

The Hopeful Believer
"Tech can be a force for good - if we use it right."
These are individuals who believe in technology's potential - but with conditions. They want to see it aligned with purpose, equity, sustainability.
They represent a rising consciousness - rooted in values but excited by progress.

The Visionary Believer
"Tech can solve our biggest problems - if we build it with values."
These are the futurists, the system designers, the entrepreneurs and ethicists. They see technology not as the end, but the instrument. They are shaping ideas like digital equity, nature-based algorithms, AI for good, open-source civic infrastructure.
They are still a minority (~10%), but often the ones influencing direction, investment, and vision.

But What Does This Mean for Power?
As these technologies expand, so does the invisible architecture of control they create.
AI is rewriting decision-making - who gets a loan, who's monitored, who gets hired.

IoT makes environments responsive, but also surveilled and monetized.

Robotics augments labor - and eliminates some of it.

In the wrong hands, this becomes a world of algorithmic monopolies, data feudalism, and invisible coercion.
In the right hands, it becomes a world of human-centered design, decentralized opportunity, and inclusive intelligence.
The question is no longer whether tech should shape the world.
It's whether the world gets to shape the tech.

What Must the Future Look Like?
Regenerative, not extractive

Technology must replenish the systems it operates in - social, ecological, emotional.

Inclusive by default

If half the world is excluded from design, the future is already broken.

Transparent and accountable

Algorithms must be explainable. Automation must be auditable.
Power must be visible.

Built for collaboration, not control

We need machines that work with us, not replace or manipulate us.

Driven by values, not just velocity

The question shouldn't be "Can we do it?" but "Why are we doing it - and for whom?"

Final Thought
The machines are here.
But so is the moment.
The moment to pause. To reflect. To design not just smarter tools, but a wiser world.
Because the future won't be built by algorithms alone.
It will be built by people bold enough to ask better questions - and human enough to care about the answers.`
  },
  {
    id: 5,
    title: "Everyone Wants to Succeed - But No One Wants to Sell",
    excerpt: "Why embracing sales might just change your life",
    category: "Sales",
    date: "March 25, 2024",
    readTime: "6 min read",
    image: "/blog/Blog5.png",
    author: {
      name: "Himanshu Pandey",
      avatar: "/Employees/Himamshu Pandey CEO.png"
    },
    content: `Let's be real for a second.
You want to win. You want your ideas heard, your projects funded, your career to take off. You want to be known, followed, respected.
You want to succeed.
But when someone says the word "sales", you flinch.
It feels… pushy. Fake. Outdated. Like a cold call from another era.
Here's the catch:
You can't succeed without learning how to sell.
Not just in business - in life.

The Tug of War You're Playing
Every time you dream big, but refuse to pitch your idea…
Every time you want people to believe in you, but won't ask for their attention…
Every time you want to grow, but avoid the discomfort of putting yourself out there…
You're in a silent tug of war with yourself.
You want the outcome - but reject the path.
You want to rise - but resist the skill that gets you there: sales.

But Wait - What Is Sales?
It's not talking someone into buying a product they don't need.
It's not tricking. Or chasing. Or pretending.
Sales is building relationships.
Sales is making people believe.
Sales is understanding someone's world - and showing them how you can add value to it.
Every time you apply for a job, pitch a startup, build a brand, promote a cause, or even ask someone on a date - you're selling.
The question is:
Are you doing it well?

Gen Z, Here's the Truth
You already have the edge. You're emotionally aware. You're digitally fluent. You value authenticity. You know when someone's being real - and when they're just performing.
Now imagine pairing that with the ability to:
Pitch without pressure
Connect without pretending
Influence without manipulating
That's not just sales. That's self-mastery.

So… Do You Want to Succeed?
Then here's the mirror you need to look into:
Do you want to succeed?
Then you need to learn how to sell.
Do you want to sell?
Then you need to see it for what it really is:
A tool. A superpower. A way of building something that matters - with people who care.

Your ideas are worth hearing.
Your future is worth pitching.
Your relationships are worth investing in.
So stop pulling against yourself.
Align. Sell. Succeed.`
  },
  {
    id: 6,
    title: "Why the Future of Sales Is Relationship Tech",
    excerpt: "And why Gen Z is perfectly positioned to lead it",
    category: "Technology",
    date: "March 28, 2024",
    readTime: "7 min read",
    image: "/blog/Blog6.png",
    author: {
      name: "Neeharika Kaila",
      avatar: "/Employees/Neeharika.jpg"
    },
    content: `Sales is changing.
And it's not just changing because of AI, data, or automation.
It's changing because people have changed.
We don't want to be chased, spammed, or tricked into a funnel.
We don't want another notification—we want a reason to care.
We don't want to be sold to.
We want to belong, believe, and build something.
And that's why the future of sales isn't built on pressure, scripts, or scale.
It's built on something deeper:
Relationships. Powered by tech. Designed for trust.

The Myth We've Been Sold: "Sales = Closing"
Let's break a myth: Sales isn't about pushing a product.
It's not about tricking someone into buying something they don't need.
And it's definitely not about who talks faster or follows up harder.
Sales, at its core, is about connection.
It's about understanding someone's world—and showing them how you can add value to it.
That could be with a product, a cause, an idea, or just your energy.
And in a world drowning in noise, that kind of clarity is rare—and powerful.

Enter Relationship Tech
Now, imagine tech that helps you build better relationships—not just track leads or count clicks.
Tech that reminds you who's worth following up with—not because they're hot leads, but because they're human.
Tech that knows when someone's curious, not just when they've clicked.
Tech that whispers, "They're more about impact than features. Lead with purpose."
Tech that doesn't automate you out of the equation—but amplifies your ability to connect.
This isn't some distant future. It's already here.
We're moving from "CRMs" (Customer Relationship Management tools) to Real Relationship Engines.
Tools that learn as you learn.
That adapt as you evolve.
That guide, coach, and care—the way you would, if you had a thousand brains and zero inbox clutter.

Why Gen Z Was Born for This
You've grown up building networks. Not with handshakes, but with DMs, Reels, and energy.
You read signals fast. You filter BS faster.
You crave authenticity—and you're allergic to the fake.
You already know how to build relationships.
You just haven't been told that this is sales—and you're already good at it.
With the right mindset + the right tech, you're not a rep. You're a relationship architect.
And in this next era of sales, that's the real flex.

Tools Won't Sell for You—But They'll Sell With You
Here's the truth no one told you:
AI won't replace you. It will refine you.
Relationship tech doesn't make you less human—it makes you more of who you already are, with sharper intuition, smarter timing, and deeper reach.
It lets you:
Scale empathy
Personalize intention
Turn outreach into relationship-building
And replace hustle with flow

The best salespeople in the future won't be those with the hardest pitch.
They'll be the ones with the clearest presence.
And the smartest systems backing them up.

The Shift Is Here. Are You?
You can either keep selling the old way: pressure & noise.
Or you can build relationships that matter—with tools that get you there faster, cleaner, and more authentically.
The future of sales isn't robotic. It's human—at scale.
And relationship tech is the bridge.
You're already the most connected generation.
Now it's time to be the most relational one.

Ready to sell like a human—with the help of machines?
Let's build what's next. Together.`
  }
];

const BlogsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!user) {
      setErrorMessage('Please sign in to subscribe');
      // Store the email in session storage
      sessionStorage.setItem('newsletterEmail', email);
      // Redirect to sign in page
      navigate('/signin?redirect=blog');
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setSubscribeStatus('submitting');
    setErrorMessage(null);
    
    try {
      // Insert into newsletter_subscriptions table
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email
            // subscribed_at will be handled by database default value
          }
        ]);
        
      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          throw new Error('This email is already subscribed to our newsletter');
        }
        throw new Error(`Subscription failed: ${error.message}`);
      }
      
      console.log('Newsletter subscription successful');
      setSubscribeStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  // Load saved email if returning from authentication
  useEffect(() => {
    if (user) {
      const savedEmail = sessionStorage.getItem('newsletterEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        sessionStorage.removeItem('newsletterEmail');
      }
    }
  }, [user]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SmartBrew Solutions Blog",
    "description": "Insights and perspectives on the future of sales and technology",
    "url": "https://smartbrew.in/blog",
    "mainEntity": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "datePublished": post.date,
      "image": `https://smartbrew.in${post.image}`,
      "url": `https://smartbrew.in/blog/${post.id}`,
      "articleSection": post.category
    }))
  };

  return (
    <>
      <SEO 
        title="Blog - Insights on Sales & Technology"
        description="Explore SmartBrew's blog for expert insights on sales technology, business automation, digital marketing strategies, and the future of customer relationship management."
        keywords="sales blog, technology insights, business automation blog, digital marketing, CRM strategies, sales technology trends, SmartBrew blog"
        url="https://smartbrew.in/blog"
        schema={blogSchema}
      />
      <div className="min-h-screen bg-gray-900 text-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span 
              className="text-gray-300 navbar-logo-text"
              style={{ textTransform: 'uppercase', color: 'rgb(209, 213, 219)' }}
            >SMARTBREW</span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> | Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights and perspectives on the future of sales and technology
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          id="categories"
        >
          {['All', 'Sales', 'Technology', 'Social Impact'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        <div id="latest">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-colors h-full flex flex-col"
                id={post.category === 'Technology' ? 'tech' : post.category === 'Sales' ? 'business' : undefined}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-700">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-500">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar size={16} className="mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-300 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 font-normal mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-sm font-normal text-gray-300">{post.author.name}</span>
                    </div>
                    <div className="flex items-center text-sm font-normal text-gray-400">
                      <Clock size={16} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="mt-6 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-gray-800 rounded-xl p-8 border border-gray-700"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400 mb-6">
              Stay updated with the latest insights on sales, technology, and business growth.
            </p>
            
            {subscribeStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 mb-4"
              >
                Thank you for subscribing to our newsletter!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                {!user && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-blue-500/20 border border-blue-500 rounded-lg text-blue-300 mb-2 text-sm flex items-start"
                  >
                    <LogIn size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="mb-2">You need to be signed in to subscribe.</p>
                      <Link
                        to="/signin?redirect=blog"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-sm transition-colors"
                      >
                        Sign In <LogIn size={16} className="ml-2 text-white" />
                      </Link>
                    </div>
                  </motion.div>
                )}
                
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 mb-4 text-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                    value={email}
                    onChange={handleEmailChange}
                placeholder="Enter your email"
                    required
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                    disabled={subscribeStatus === 'submitting' || !user}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      subscribeStatus === 'submitting' || !user
                        ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white font-bold'
                    }`}
                  >
                    {subscribeStatus === 'submitting' ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      user ? 'Subscribe' : 'Sign in to Subscribe'
                    )}
              </button>
                </div>
            </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Blog Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogPostDetail
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default BlogsPage; 