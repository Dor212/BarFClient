

const TermsPage: React.FC = () => {
    const brandName = "בר פליישקר";
    const email = "barflyshker@gmail.com";
    const phone = "052-5551825";
    const lastUpdated = "אוגוסט 2025";

    return (
        <div
            dir="rtl"
            className="container max-w-6xl px-4 py-8 mx-auto mt-20"
            style={{ backgroundColor: "#FFF8F8", color: "#063942" }}
        >
          
            <h1 className="mb-10 text-5xl font-bold text-center">
                תנאי שימוש באתר {brandName}
            </h1>

            <div className="flex flex-col items-center justify-around gap-2 p-4 mb-8 border border-gray-200 shadow-lg rounded-xl bg-gradient-to-r from-gray-50 to-white sm:flex-row">
                <div className="text-center">
                    <strong>תאריך עדכון:</strong> {lastUpdated}
                </div>
                <div className="text-center">
                    <strong>יצירת קשר:</strong>{" "}
                    <a className="underline" href={`mailto:${email}`}>{email}</a>
                </div>
                <div className="text-center">
                    <strong>טלפון:</strong>{" "}
                    <a className="underline" href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                </div>
            </div>

        
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">1. כללי וקבלת התנאים</h2>
                <p className="mt-3 leading-7">
                    תנאי שימוש אלה ("התנאים") מסדירים את הגלישה והשימוש באתר {brandName} (להלן: "האתר").
                    הגישה לאתר והשימוש בו מהווים הסכמה מלאה ומודעת לתנאים אלה, לרבות מדיניות
                    הפרטיות והצהרת הנגישות שלנו. אם אינך מסכים/ה לתנאים – אנא הימנע/י משימוש באתר.
                </p>
            </section>

            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">2. הגדרות, עדכונים ושינויים</h2>
                <p className="mt-3 leading-7">
                    אנו רשאים לעדכן מעת לעת את התנאים, את מדיניות הפרטיות ואת תכני האתר. המשך שימוש באתר לאחר שינוי
                    ייחשב כהסכמה לתנאים המעודכנים. הגרסה המחייבת היא זו המוצגת באתר בפועל במועד השימוש.
                </p>
            </section>

         
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">3. כשירות לשימוש וגיל מינימלי</h2>
                <p className="mt-3 leading-7">
                    השימוש באתר מיועד לבגירים (18+) או בהסכמת הורה/אפוטרופוס כדין. באחריות המשתמש לוודא כי מותר לו
                    להשתמש באתר לפי כל דין החל עליו.
                </p>
            </section>

          
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">4. שימוש מותר באתר</h2>
                <ul className="pr-5 mt-3 space-y-2 leading-7 list-disc">
                    <li>השימוש הוא אישי, חוקי וסביר בלבד; אין לבצע פעולות העשויות לפגוע באתר, במשתמשים אחרים או בצדדים שלישיים.</li>
                    <li>אין להעלות תוכן בלתי חוקי, פוגעני, מטעה, מפר זכויות יוצרים/סימני מסחר או פוגע בפרטיות.</li>
                    <li>אין לבצע הנדסה חוזרת, סריקות אוטומטיות, כריית נתונים או שימוש ב־bots ללא הרשאה מפורשת בכתב.</li>
                </ul>
            </section>

           
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">5. זכויות קניין רוחני</h2>
                <p className="mt-3 leading-7">
                    כל התכנים באתר – לרבות טקסטים, עיצובים, תמונות, לוגואים, קוד ותיעוד – הינם בבעלות {brandName}
                    ו/או בעלי זכויות אחרים שהרשו לנו להשתמש בהם, ומוגנים בדין הישראלי והבינלאומי. אין להעתיק, להפיץ,
                    לפרסם, לשנות, לשדר, להציג או לעשות שימוש מסחרי כלשהו בתכנים ללא רישיון כתוב מראש.
                </p>
            </section>

            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">6. תכני משתמשים והעלאות</h2>
                <p className="mt-3 leading-7">
                    ככל שהאתר מאפשר העלאת תוכן/מסמכים/תגובות, אחריות מלאה על התוכן מוטלת על המשתמש שהעלה אותו.
                    בעת העלאה, המשתמש מצהיר כי יש לו את כל הזכויות הנדרשות וכי התוכן אינו מפר דין ואינו פוגע בצדדים שלישיים.
                    אנו רשאים, לפי שיקול דעתנו, להסיר תכנים בניגוד לתנאים.
                </p>
            </section>

            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">7. עסקאות, תשלומים וביטולים</h2>
                <p className="mt-3 leading-7">
                    אם מתבצעות רכישות/הזמנות דרך האתר, הן כפופות לתנאים מסחריים שייקבעו בעמודי המוצר/השירות,
                    כולל אופן התשלום, מועדי אספקה ומדיניות ביטולים/החזרים בהתאם לדין. במקרה של סתירה בין התנאים המסחריים
                    לתנאי שימוש אלה – יגברו התנאים המסחריים הספציפיים.
                </p>
            </section>

         
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">8. פרטיות ועוגיות (Cookies)</h2>
                <p className="mt-3 leading-7">
                    השימוש באתר כפוף ל{" "}
                    <a href="/accessibility" className="underline">מדיניות הפרטיות</a>{" "}
                    שלנו. האתר עשוי להשתמש בעוגיות/פיקסלים לצורך תפקוד, אבטחה, מדידה ושיפור חוויה.
                    ניתן לנהל העדפות בדפדפן. חלק מהפונקציות עשויות שלא לפעול ללא עוגיות מסוימות.
                </p>
            </section>

            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">9. נגישות</h2>
                <p className="mt-3 leading-7">
                    אנו פועלים להנגשת האתר בהתאם לדין ולתקן הישראלי ת״י 5568. לפרטים מלאים ראו{" "}
                    <a href="/accessibility" className="underline">הצהרת נגישות</a>. נשמח לקבל פניות בנושא הנגשה לכתובת המייל/טלפון המופיעים למעלה.
                </p>
            </section>

           
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">10. קישורים לאתרים חיצוניים</h2>
                <p className="mt-3 leading-7">
                    האתר עשוי להכיל קישורים לאתרים/שירותים של צדדים שלישיים. אין לנו שליטה עליהם ואנו לא אחראים לתכניהם,
                    למדיניות הפרטיות שלהם או לפרקטיקותיהם. הגלישה אליהם הינה באחריות המשתמש בלבד.
                </p>
            </section>

        
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">11. כתב ויתור והגבלת אחריות</h2>
                <p className="mt-3 leading-7">
                    האתר והתכנים בו מסופקים "כפי שהם" (AS IS) וללא אחריות מכל סוג, מפורשת או משתמעת.
                    {` ${brandName} `} לא יישא באחריות לכל נזק ישיר, עקיף, תוצאתי, מיוחד או עונשי הנובע מן השימוש באתר,
                    לרבות אובדן נתונים/רווחים, וזאת במידה המרבית המותרת על פי דין.
                </p>
            </section>

          
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">12. שיפוי</h2>
                <p className="mt-3 leading-7">
                    המשתמש מתחייב לשפות ולפצות את {brandName}, עובדיו, נציגיו וספקיו בגין כל נזק, הפסד, הוצאה או תביעה
                    שתיגרם עקב הפרת התנאים או הפרת כל דין בקשר לשימוש באתר.
                </p>
            </section>

            {/* דין וסמכות שיפוט */}
            <section className="p-6 mb-6 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">13. דין וסמכות שיפוט</h2>
                <p className="mt-3 leading-7">
                    על התנאים יחולו דיני מדינת ישראל בלבד. סמכות השיפוט הבלעדית בכל מחלוקת הנוגעת לתנאים ו/או לשימוש באתר
                    נתונה לבתי המשפט המוסמכים במחוז תל אביב–יפו.
                </p>
            </section>

            {/* שונות */}
            <section className="p-6 mb-10 transition border shadow-lg rounded-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl">
                <h2 className="text-2xl font-semibold">14. שונות</h2>
                <ul className="pr-5 mt-3 space-y-2 leading-7 list-disc">
                    <li>אי אכיפה של זכות לפי התנאים לא תיחשב ויתור על זכות.</li>
                    <li>אם יימצא סעיף בתנאים כבלתי ניתן לאכיפה – שאר הסעיפים יישארו בתוקפם.</li>
                    <li>לא ניתן להסב זכויות/חובות לפי תנאים אלה ללא הסכמה מראש ובכתב.</li>
                </ul>
                <p className="mt-6 text-sm opacity-70">
                    *המסמך לעיל הינו תבנית כללית ואינו מהווה ייעוץ משפטי. עבור התאמה מלאה לצרכיך מומלץ להתייעץ עם עו״ד.
                </p>
            </section>
        </div>
    );
};

export default TermsPage;
