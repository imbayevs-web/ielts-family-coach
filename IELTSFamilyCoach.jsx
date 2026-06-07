import { useState } from "react";

const mockStudent = {
  name: "Айша",
  avatar: "А",
  streak: 7,
  xp: 1340,
  xpToNext: 1500,
  band: 5.5,
  targetBand: 7.0,
  weeklyGoal: 5,
  weeklyDone: 4,
  totalMinutes: 620,
  badges: [
    { id: 1, name: "Серия 3 дня", icon: "🔥", earned: true },
    { id: 2, name: "Серия 7 дней", icon: "⚡", earned: true },
    { id: 3, name: "Герой слов", icon: "📚", earned: false },
    { id: 4, name: "Смелый оратор", icon: "🎙️", earned: false },
    { id: 5, name: "Звезда пересказа", icon: "✍️", earned: true },
  ],
  todayDone: false,
  recentWords: ["melancholy", "persevere", "eloquent", "ambiguous", "prevalent"],
};

const mockParent = {
  childName: "Айша",
  todayCompleted: false,
  weeklyStreak: 7,
  totalMinutes: 620,
  writingBand: 5.5,
  speakingBand: 5.0,
  vocabLearned: 87,
  recentContent: [
    { title: "Очень странные дела", ep: "S1E2", date: "Сегодня", platform: "Netflix" },
    { title: "TED Talk: Сила привычки", ep: "—", date: "Вчера", platform: "YouTube" },
    { title: "Корона", ep: "S3E1", date: "3 дня назад", platform: "Netflix" },
  ],
  weakAreas: ["Связность текста", "Лексический диапазон", "Произношение"],
  writingHistory: [4.5, 5.0, 5.0, 5.5, 5.5, 5.5],
  speakingHistory: [4.0, 4.5, 4.5, 5.0, 5.0, 5.0],
  aiSummary:
    "Айша демонстрирует стабильный прогресс. Она поддерживает серию из 7 дней и пишет пересказы с улучшающимся разнообразием предложений. Основная зона роста — глубина словарного запаса: она склонна повторять распространённые слова. Уверенность в говорении растёт, ответы становятся длиннее. Рекомендую на следующей неделе сосредоточиться на структуре эссе IELTS Task 2.",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #F0F2FF;
    min-height: 100vh;
    color: #1F2937;
  }

  .app { min-height: 100vh; }

  .nav {
    background: #fff;
    border-bottom: 1px solid #E5E7EB;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-brand {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #6C63FF;
    letter-spacing: -0.5px;
  }
  .nav-brand span { color: #FF6B9D; }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab {
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #6B7280;
    transition: all 0.2s;
  }
  .nav-tab.active { background: #6C63FF; color: #fff; }
  .nav-tab:hover:not(.active) { background: #F3F4F6; color: #374151; }
  .nav-user {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #6B7280;
  }
  .avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6C63FF, #FF6B9D);
    color: white;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 13px;
  }

  .main { padding: 2rem; max-width: 1100px; margin: 0 auto; }

  .card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #E5E7EB;
    padding: 1.25rem 1.5rem;
  }
  .card-sm { padding: 1rem 1.25rem; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

  .h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 26px; letter-spacing: -0.5px;
  }
  .h2 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: 18px;
  }
  .h3 { font-weight: 600; font-size: 15px; }
  .label { font-size: 12px; font-weight: 500; color: #9CA3AF; letter-spacing: 0.5px; text-transform: uppercase; }
  .muted { color: #6B7280; font-size: 14px; }
  .big-num {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 28px; font-weight: 800; letter-spacing: -1px;
  }

  .progress-track {
    height: 8px; background: #F3F4F6;
    border-radius: 99px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.6s ease;
  }

  .badge-pill {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 99px;
    font-size: 12px; font-weight: 600;
  }
  .badge-purple { background: #EEF0FF; color: #6C63FF; }
  .badge-pink { background: #FFF0F6; color: #FF6B9D; }
  .badge-teal { background: #E6FAFA; color: #0FBCAD; }
  .badge-amber { background: #FFFBEB; color: #D97706; }
  .badge-green { background: #ECFDF5; color: #059669; }
  .badge-gray { background: #F3F4F6; color: #9CA3AF; }

  .streak-bar { display: flex; gap: 6px; }
  .streak-day {
    flex: 1; height: 6px; border-radius: 99px;
    background: #E5E7EB;
  }
  .streak-day.done { background: linear-gradient(90deg, #6C63FF, #FF6B9D); }

  .mission-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #F3F4F6;
  }
  .mission-item:last-child { border-bottom: none; }
  .mission-check {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
    font-size: 12px;
  }
  .mission-check.done { background: #10B981; color: white; }
  .mission-check.todo { background: #F3F4F6; border: 2px dashed #D1D5DB; }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px;
    font-weight: 600; font-size: 14px;
    cursor: pointer; border: none; transition: all 0.2s;
  }
  .btn-primary {
    background: linear-gradient(135deg, #6C63FF, #9F8EFF);
    color: white;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(108,99,255,0.3); }
  .btn-pink {
    background: linear-gradient(135deg, #FF6B9D, #FF9CC0);
    color: white;
  }
  .btn-pink:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,107,157,0.3); }
  .btn-outline {
    background: white; color: #6C63FF;
    border: 1.5px solid #6C63FF;
  }
  .btn-outline:hover { background: #EEF0FF; }
  .btn-sm { padding: 7px 14px; font-size: 13px; }

  .field {
    width: 100%; border: 1.5px solid #E5E7EB;
    border-radius: 10px; padding: 10px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #1F2937;
    resize: vertical; transition: border-color 0.2s;
    background: #FAFAFA;
  }
  .field:focus { outline: none; border-color: #6C63FF; background: white; }

  .ai-block {
    background: linear-gradient(135deg, #EEF0FF 0%, #FFF0F6 100%);
    border: 1px solid #D4D0FF;
    border-radius: 14px; padding: 1.25rem;
  }
  .ai-section { margin-bottom: 1rem; }
  .ai-section:last-child { margin-bottom: 0; }

  .word-table { width: 100%; border-collapse: collapse; }
  .word-table th {
    font-size: 11px; font-weight: 600; color: #9CA3AF;
    text-transform: uppercase; letter-spacing: 0.5px;
    text-align: left; padding: 8px 10px;
    background: #F9FAFB; border-bottom: 1px solid #E5E7EB;
  }
  .word-table td {
    padding: 9px 10px; font-size: 14px;
    border-bottom: 1px solid #F3F4F6;
  }
  .word-table tr:hover td { background: #FAFBFF; }

  .band-meter {
    position: relative; height: 12px;
    background: linear-gradient(90deg, #EF4444, #F59E0B, #10B981, #6C63FF);
    border-radius: 99px;
  }
  .band-needle {
    position: absolute; top: -4px;
    width: 20px; height: 20px;
    background: white; border: 3px solid #6C63FF;
    border-radius: 50%; transform: translateX(-50%);
    transition: left 0.8s ease;
  }

  .mini-graph { display: flex; align-items: flex-end; gap: 4px; height: 50px; }
  .mini-bar {
    flex: 1; border-radius: 4px 4px 0 0;
    transition: height 0.5s;
    min-height: 4px;
  }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  .pulse { animation: pulse 2s ease infinite; }

  .section-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700; font-size: 16px; color: #374151;
    margin-bottom: 0.75rem;
  }
  .divider { height: 1px; background: #F3F4F6; margin: 1.25rem 0; }

  .stat-card {
    background: #fff; border: 1px solid #E5E7EB;
    border-radius: 14px; padding: 1rem 1.25rem;
  }
  .stat-card .stat-val {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 30px; font-weight: 800; letter-spacing: -1px;
  }

  @media (max-width: 700px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
    .grid-2 { grid-template-columns: 1fr; }
    .main { padding: 1rem; }
  }
`;

function ProgressBar({ value, max, color = "#6C63FF", height = 8 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-track" style={{ height }}>
      <div className="progress-fill" style={{ width: `${pct}%`, background: color, height }} />
    </div>
  );
}

function BandMeter({ current, target }) {
  const pct = ((current - 4) / (9 - 4)) * 100;
  return (
    <div>
      <div className="band-meter">
        <div className="band-needle" style={{ left: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {[4, 5, 6, 7, 8, 9].map((b) => (
          <span key={b} style={{ fontSize: 11, fontWeight: b === target ? 700 : 400, color: b === target ? "#6C63FF" : "#9CA3AF" }}>
            {b}.0
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniGraph({ data, color = "#6C63FF" }) {
  const max = Math.max(...data);
  return (
    <div className="mini-graph">
      {data.map((v, i) => (
        <div key={i} className="mini-bar" style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${color}, ${color}88)` }} />
      ))}
    </div>
  );
}

// ─── ДАШБОРД УЧЕНИКА ──────────────────────────────────────────────────────────

function StudentDashboard({ onGoToTask }) {
  const s = mockStudent;
  const xpPct = Math.round((s.xp / s.xpToNext) * 100);

  return (
    <div className="main fade-in">
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div className="label" style={{ marginBottom: 4 }}>Доброе утро ✨</div>
          <div className="h1">Привет, {s.name}! Готова прокачаться? 🚀</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="label">Текущий балл</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#6C63FF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.band}</div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: "1rem" }}>
        <div className="card card-sm">
          <div className="label" style={{ marginBottom: 6 }}>🔥 Серия</div>
          <div className="big-num" style={{ color: "#FF6B9D" }}>{s.streak}</div>
          <div className="muted" style={{ fontSize: 12 }}>дней подряд!</div>
        </div>
        <div className="card card-sm">
          <div className="label" style={{ marginBottom: 6 }}>⚡ Очки XP</div>
          <div className="big-num" style={{ color: "#6C63FF" }}>{s.xp.toLocaleString()}</div>
          <div className="muted" style={{ fontSize: 12 }}>ещё {s.xpToNext - s.xp} до уровня</div>
        </div>
        <div className="card card-sm">
          <div className="label" style={{ marginBottom: 6 }}>📅 Цель недели</div>
          <div className="big-num" style={{ color: "#0FBCAD" }}>{s.weeklyDone}/{s.weeklyGoal}</div>
          <div className="muted" style={{ fontSize: 12 }}>дней выполнено</div>
        </div>
        <div className="card card-sm">
          <div className="label" style={{ marginBottom: 6 }}>🕒 Всего времени</div>
          <div className="big-num" style={{ color: "#F59E0B" }}>{s.totalMinutes}</div>
          <div className="muted" style={{ fontSize: 12 }}>минут занятий</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div className="h2">Задание на сегодня</div>
            <span className="badge-pill badge-pink">День {s.streak}</span>
          </div>
          {[
            { icon: "🎬", label: "Смотри 20 мин на английском", sub: "Netflix, YouTube, Language Reactor…", done: true },
            { icon: "📝", label: "Добавь 10 новых слов", sub: "Со значением и примером предложения", done: true },
            { icon: "✍️", label: "Напиши пересказ 100–150 слов", sub: "Что произошло в серии?", done: false },
            { icon: "🎙️", label: "Ответь на вопрос IELTS Speaking", sub: "Напечатай или запиши свой ответ", done: false },
          ].map((m, i) => (
            <div className="mission-item" key={i}>
              <div className={`mission-check ${m.done ? "done" : "todo"}`}>{m.done ? "✓" : ""}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, textDecoration: m.done ? "line-through" : "none", color: m.done ? "#9CA3AF" : "#1F2937" }}>
                  {m.icon} {m.label}
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{m.sub}</div>
              </div>
              {m.done && <span className="badge-pill badge-green" style={{ fontSize: 11 }}>+50 XP</span>}
            </div>
          ))}
          <div style={{ marginTop: "1rem" }}>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={onGoToTask}>
              Открыть задание дня ✨
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card card-sm">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div className="h3">Прогресс XP</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#6C63FF" }}>{xpPct}%</span>
            </div>
            <ProgressBar value={s.xp} max={s.xpToNext} color="linear-gradient(90deg, #6C63FF, #FF6B9D)" />
            <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>{s.xp} / {s.xpToNext} XP — Уровень 6</div>
          </div>

          <div className="card card-sm">
            <div className="h3" style={{ marginBottom: 8 }}>Прогресс балла</div>
            <BandMeter current={s.band} target={7} />
            <div style={{ marginTop: 8, fontSize: 12, color: "#6B7280" }}>
              До цели осталось {(s.targetBand - s.band).toFixed(1)} балла 🎯
            </div>
          </div>

          <div className="card card-sm">
            <div className="h3" style={{ marginBottom: 10 }}>Эта неделя</div>
            <div className="streak-bar">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div className={`streak-day ${i < s.weeklyDone ? "done" : ""}`} />
                  <div style={{ fontSize: 9, color: "#9CA3AF", marginTop: 4 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "1rem" }}>
        <div className="card">
          <div className="h2" style={{ marginBottom: "0.75rem" }}>🏆 Твои достижения</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {s.badges.map((b) => (
              <div key={b.id} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", borderRadius: 10,
                background: b.earned ? "#EEF0FF" : "#F9FAFB",
                border: `1px solid ${b.earned ? "#D4D0FF" : "#E5E7EB"}`,
                opacity: b.earned ? 1 : 0.5,
              }}>
                <span style={{ fontSize: 20 }}>{b.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: b.earned ? "#6C63FF" : "#9CA3AF" }}>{b.name}</span>
                {b.earned
                  ? <span className="badge-pill badge-green" style={{ marginLeft: "auto", fontSize: 11 }}>Получено!</span>
                  : <span className="badge-pill badge-gray" style={{ marginLeft: "auto", fontSize: 11 }}>Заблокировано</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <div className="h2">📚 Последние слова</div>
            <span className="badge-pill badge-teal">+87 всего</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1rem" }}>
            {s.recentWords.map((w) => (
              <span key={w} className="badge-pill badge-purple" style={{ fontSize: 13 }}>{w}</span>
            ))}
          </div>
          <div className="divider" />
          <div className="label" style={{ marginBottom: 8 }}>Вопрос IELTS Speaking на сегодня</div>
          <div style={{
            background: "linear-gradient(135deg, #EEF0FF, #FFF0F6)",
            border: "1px solid #D4D0FF",
            borderRadius: 10, padding: "12px 14px",
            fontSize: 14, fontWeight: 500, color: "#4B3F9F", lineHeight: 1.5,
          }}>
            🗣️ "Describe a time when you had to make an important decision. What was it, and how did you make it?"
          </div>
          <button className="btn btn-outline btn-sm" style={{ marginTop: 10, width: "100%" }} onClick={onGoToTask}>
            Ответить на вопрос →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── СТРАНИЦА ЗАДАНИЯ ────────────────────────────────────────────────────────

function StudentTaskPage() {
  const [words, setWords] = useState([
    { word: "melancholy", meaning: "чувство грусти", example: "She felt melancholy after the film ended." },
    { word: "persevere", meaning: "продолжать несмотря на трудности", example: "She persevered through every challenge." },
    { word: "", meaning: "", example: "" },
  ]);
  const [summary, setSummary] = useState("");
  const [speaking, setSpeaking] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentTitle, setContentTitle] = useState("Очень странные дела");
  const [episode, setEpisode] = useState("S1E3");
  const [platform, setPlatform] = useState("Netflix");

  const mockFeedback = {
    grammar: [
      { original: "She have watched the episode carefully.", corrected: "She has watched the episode carefully." },
      { original: "The character is very brave and she help her friend.", corrected: "The character is very brave and she helps her friend." },
    ],
    vocabulary: [
      { original: "good", better: "outstanding / remarkable" },
      { original: "bad", better: "devastating / catastrophic" },
      { original: "said", better: "exclaimed / revealed / insisted" },
    ],
    writingBand: "5.5",
    speakingFeedback: "Хорошая попытка! Твой ответ понятен и по теме. Старайся добавлять больше деталей — объясняй, ПОЧЕМУ ты приняла такое решение, а не только ЧТО это было. Используй вводные слова: 'furthermore', 'as a result', 'looking back'.",
    nextRecommendation: "Завтра посмотри 4-ю серию. Обращай внимание на то, как персонажи убеждают друг друга — это поможет в IELTS Speaking Part 3. Постарайся использовать 3 новых слова в завтрашнем пересказе.",
  };

  const handleAICheck = () => {
    if (!summary.trim() && !speaking.trim()) return;
    setLoading(true);
    setTimeout(() => { setFeedback(mockFeedback); setLoading(false); }, 2000);
  };

  const updateWord = (i, field, val) => {
    const next = [...words];
    next[i] = { ...next[i], [field]: val };
    if (i === words.length - 1 && val && words.length < 10) next.push({ word: "", meaning: "", example: "" });
    setWords(next);
  };

  const wordCount = summary.split(" ").filter(Boolean).length;

  return (
    <div className="main fade-in">
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 12 }}>
        <div>
          <div className="label" style={{ marginBottom: 4 }}>Задание дня</div>
          <div className="h1">Выполни ежедневное задание 📖</div>
        </div>
        <span className="badge-pill badge-purple" style={{ marginLeft: "auto" }}>+200 XP за выполнение</span>
      </div>

      {/* Что смотрела */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="h2" style={{ marginBottom: "1rem" }}>🎬 Что ты смотрела сегодня?</div>
        <div style={{ background: "#F0F2FF", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#6B7280", marginBottom: "1rem" }}>
          💡 Ты можешь смотреть через <strong>Netflix</strong>, <strong>YouTube</strong>, <strong>Language Reactor</strong> или любой другой английский контент. Напиши, что смотрела, ниже.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 10 }}>
          <div>
            <div className="label" style={{ marginBottom: 4 }}>Название фильма / сериала</div>
            <input className="field" value={contentTitle} onChange={e => setContentTitle(e.target.value)} placeholder="например, Очень странные дела" style={{ height: 38 }} />
          </div>
          <div>
            <div className="label" style={{ marginBottom: 4 }}>Эпизод / видео</div>
            <input className="field" value={episode} onChange={e => setEpisode(e.target.value)} placeholder="например, S1E3" style={{ height: 38 }} />
          </div>
          <div>
            <div className="label" style={{ marginBottom: 4 }}>Платформа</div>
            <select className="field" value={platform} onChange={e => setPlatform(e.target.value)} style={{ height: 38 }}>
              <option>Netflix</option>
              <option>YouTube</option>
              <option>Language Reactor</option>
              <option>Apple TV</option>
              <option>Другое</option>
            </select>
          </div>
        </div>
      </div>

      {/* Словарь */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div className="h2">📚 Новые слова (цель: 10 слов)</div>
          <span className="badge-pill badge-teal">{words.filter(w => w.word).length} / 10</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="word-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}># Слово</th>
                <th style={{ width: "35%" }}>Значение</th>
                <th>Пример предложения</th>
              </tr>
            </thead>
            <tbody>
              {words.map((w, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#9CA3AF", fontWeight: 700, fontSize: 12, minWidth: 16 }}>{i + 1}</span>
                      <input className="field" value={w.word} onChange={e => updateWord(i, "word", e.target.value)}
                        placeholder="новое слово…" style={{ border: "none", background: "transparent", padding: "4px 0", fontWeight: 600 }} />
                    </div>
                  </td>
                  <td>
                    <input className="field" value={w.meaning} onChange={e => updateWord(i, "meaning", e.target.value)}
                      placeholder="значение…" style={{ border: "none", background: "transparent", padding: "4px 0" }} />
                  </td>
                  <td>
                    <input className="field" value={w.example} onChange={e => updateWord(i, "example", e.target.value)}
                      placeholder="используй в предложении…" style={{ border: "none", background: "transparent", padding: "4px 0" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Пересказ */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div className="h2">✍️ Пересказ серии</div>
          <span style={{ fontSize: 12, color: wordCount >= 100 ? "#10B981" : "#F59E0B", fontWeight: 600 }}>
            {wordCount} слов / цель 100–150
          </span>
        </div>
        <div className="muted" style={{ fontSize: 13, marginBottom: 8 }}>
          Напиши, что произошло в серии. Постарайся использовать свои новые слова!
        </div>
        <textarea className="field" rows={5} value={summary} onChange={e => setSummary(e.target.value)}
          placeholder="В этой серии главные герои обнаруживают таинственный тоннель под городом. Одиннадцать использует свои телекинетические способности, чтобы…" />
        <div style={{ marginTop: 6 }}>
          <ProgressBar value={Math.min(wordCount, 150)} max={150} color={wordCount >= 100 ? "#10B981" : "#F59E0B"} />
        </div>
      </div>

      {/* Speaking */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="h2" style={{ marginBottom: 8 }}>🎙️ Ответ на вопрос Speaking</div>
        <div style={{
          background: "linear-gradient(135deg, #EEF0FF, #FFF0F6)",
          border: "1px solid #D4D0FF", borderRadius: 10, padding: "12px 14px",
          fontSize: 14, fontWeight: 500, color: "#4B3F9F", marginBottom: 12, lineHeight: 1.5,
        }}>
          🗣️ "Describe a time when you had to make an important decision. What was it, and how did you make it?"
        </div>
        <textarea className="field" rows={4} value={speaking} onChange={e => setSpeaking(e.target.value)}
          placeholder="Когда мне было 11 лет, мне нужно было решить, менять ли школу. Это было важно, потому что…" />
        <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
          Стремись к ответу на 2–3 минуты. Используй структуру: ситуация → действие → результат → вывод.
        </div>
      </div>

      {/* Кнопка AI */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <button className="btn btn-pink pulse" style={{ fontSize: 16, padding: "14px 40px" }} onClick={handleAICheck} disabled={loading}>
          {loading ? "🤖 ИИ проверяет твою работу…" : "✨ Проверить с помощью ИИ"}
        </button>
        <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
          ИИ проверит грамматику, словарный запас и оценит твой балл IELTS.
        </div>
      </div>

      {/* Обратная связь ИИ */}
      {feedback && (
        <div className="ai-block fade-in" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
            <span style={{ fontSize: 24 }}>🤖</span>
            <div>
              <div className="h2">Обратная связь от ИИ</div>
              <div className="muted" style={{ fontSize: 12 }}>Вот что думает твой ИИ-тренер</div>
            </div>
            <span className="badge-pill badge-green" style={{ marginLeft: "auto", fontSize: 13 }}>
              Writing Band: {feedback.writingBand}
            </span>
          </div>

          <div className="ai-section">
            <div className="section-title" style={{ fontSize: 14, color: "#6C63FF" }}>📝 Исправление грамматики</div>
            {feedback.grammar.map((g, i) => (
              <div key={i} style={{ marginBottom: 8, padding: "8px 12px", background: "white", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 13, color: "#EF4444", textDecoration: "line-through" }}>{g.original}</div>
                <div style={{ fontSize: 13, color: "#10B981", fontWeight: 500, marginTop: 2 }}>✓ {g.corrected}</div>
              </div>
            ))}
          </div>

          <div className="ai-section">
            <div className="section-title" style={{ fontSize: 14, color: "#FF6B9D" }}>💎 Лучший словарный запас</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {feedback.vocabulary.map((v, i) => (
                <div key={i} style={{ background: "white", borderRadius: 8, padding: "6px 12px", border: "1px solid #E5E7EB", fontSize: 13 }}>
                  <span style={{ textDecoration: "line-through", color: "#9CA3AF" }}>{v.original}</span>
                  <span style={{ color: "#6C63FF", fontWeight: 600 }}> → {v.better}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-section">
            <div className="section-title" style={{ fontSize: 14, color: "#0FBCAD" }}>🎙️ Обратная связь по Speaking</div>
            <div style={{ background: "white", borderRadius: 8, padding: "10px 14px", fontSize: 13, border: "1px solid #E5E7EB", lineHeight: 1.6 }}>
              {feedback.speakingFeedback}
            </div>
          </div>

          <div className="ai-section">
            <div className="section-title" style={{ fontSize: 14, color: "#F59E0B" }}>🔮 Следующая рекомендация</div>
            <div style={{ background: "white", borderRadius: 8, padding: "10px 14px", fontSize: 13, border: "1px solid #E5E7EB", lineHeight: 1.6 }}>
              {feedback.nextRecommendation}
            </div>
          </div>

          <div style={{ marginTop: "1rem", display: "flex", gap: 10 }}>
            <button className="btn btn-primary btn-sm">✓ Отметить выполненным (+200 XP)</button>
            <button className="btn btn-outline btn-sm">Сохранить и продолжить позже</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ДАШБОРД РОДИТЕЛЯ ─────────────────────────────────────────────────────────

function ParentDashboard() {
  const p = mockParent;

  return (
    <div className="main fade-in">
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div className="label" style={{ marginBottom: 4 }}>Вид родителя</div>
          <div className="h1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Отчёт о прогрессе {p.childName}
          </div>
          <div className="muted" style={{ marginTop: 4 }}>Обновлено сегодня в 14:32 · Неделя 12 подготовки к IELTS</div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: p.todayCompleted ? "#ECFDF5" : "#FFF7ED",
          border: `1px solid ${p.todayCompleted ? "#A7F3D0" : "#FED7AA"}`,
          borderRadius: 12, padding: "12px 20px",
        }}>
          <span style={{ fontSize: 28 }}>{p.todayCompleted ? "✅" : "⏳"}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: p.todayCompleted ? "#065F46" : "#92400E" }}>
              Задание сегодня
            </div>
            <div style={{ fontSize: 13, color: p.todayCompleted ? "#047857" : "#B45309" }}>
              {p.todayCompleted ? "Выполнено" : "Ещё не выполнено"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: "1rem" }}>
        <div className="stat-card">
          <div className="label" style={{ marginBottom: 8 }}>Серия за неделю</div>
          <div className="stat-val" style={{ color: "#FF6B9D" }}>{p.weeklyStreak}</div>
          <div className="muted" style={{ fontSize: 12 }}>дней</div>
        </div>
        <div className="stat-card">
          <div className="label" style={{ marginBottom: 8 }}>Время занятий</div>
          <div className="stat-val" style={{ color: "#6C63FF" }}>{p.totalMinutes}</div>
          <div className="muted" style={{ fontSize: 12 }}>минут всего</div>
        </div>
        <div className="stat-card">
          <div className="label" style={{ marginBottom: 8 }}>Изучено слов</div>
          <div className="stat-val" style={{ color: "#0FBCAD" }}>{p.vocabLearned}</div>
          <div className="muted" style={{ fontSize: 12 }}>единиц словаря</div>
        </div>
        <div className="stat-card">
          <div className="label" style={{ marginBottom: 8 }}>Целевой балл</div>
          <div className="stat-val" style={{ color: "#F59E0B" }}>7.0</div>
          <div className="muted" style={{ fontSize: 12 }}>текущий: {p.writingBand}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <div className="h2">Резюме ИИ-тренера</div>
          </div>
          <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{p.aiSummary}</div>
          <div className="divider" />
          <div className="label" style={{ marginBottom: 8 }}>Прогресс балла к 7.0</div>
          <BandMeter current={p.writingBand} target={7} />
          <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: 12 }}>Сейчас: {p.writingBand}</span>
            <span className="muted" style={{ fontSize: 12 }}>Цель: 7.0</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <div className="h2" style={{ marginBottom: "0.75rem" }}>⚠️ Зоны для улучшения</div>
            {p.weakAreas.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ["#EF4444", "#F59E0B", "#6C63FF"][i], flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#374151" }}>{a}</span>
                <span className={`badge-pill ${["badge-pink", "badge-amber", "badge-purple"][i]}`} style={{ marginLeft: "auto", fontSize: 11 }}>
                  {["Высокий", "Средний", "Низкий"][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="h2" style={{ marginBottom: "0.75rem" }}>📅 Эта неделя</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    height: 28, borderRadius: 6,
                    background: i < 4 ? "linear-gradient(135deg, #6C63FF, #FF6B9D)" : "#F3F4F6",
                    marginBottom: 4,
                  }} />
                  <span style={{ fontSize: 9, color: "#9CA3AF" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "1rem" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <div className="h2">✍️ История балла Writing</div>
            <span className="badge-pill badge-purple">Балл {p.writingBand}</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <MiniGraph data={p.writingHistory} color="#6C63FF" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Н1", "Н2", "Н3", "Н4", "Н5", "Н6"].map((w, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{p.writingHistory[i]}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF" }}>{w}</div>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="label" style={{ marginBottom: 4 }}>Выполнение задачи</div>
              <ProgressBar value={5.5} max={9} color="#6C63FF" />
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>5.5 / 9.0</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="label" style={{ marginBottom: 4 }}>Связность</div>
              <ProgressBar value={5} max={9} color="#FF6B9D" />
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>5.0 / 9.0</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <div className="h2">🎙️ История балла Speaking</div>
            <span className="badge-pill badge-teal">Балл {p.speakingBand}</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <MiniGraph data={p.speakingHistory} color="#0FBCAD" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Н1", "Н2", "Н3", "Н4", "Н5", "Н6"].map((w, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{p.speakingHistory[i]}</div>
                <div style={{ fontSize: 10, color: "#9CA3AF" }}>{w}</div>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="label" style={{ marginBottom: 4 }}>Беглость</div>
              <ProgressBar value={5} max={9} color="#0FBCAD" />
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>5.0 / 9.0</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="label" style={{ marginBottom: 4 }}>Словарный запас</div>
              <ProgressBar value={4.5} max={9} color="#F59E0B" />
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>4.5 / 9.0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="h2" style={{ marginBottom: "0.75rem" }}>🎬 Просмотренный контент</div>
        <table className="word-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Эпизод</th>
              <th>Платформа</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {p.recentContent.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{c.title}</td>
                <td style={{ color: "#6B7280" }}>{c.ep}</td>
                <td><span className="badge-pill badge-purple" style={{ fontSize: 12 }}>{c.platform}</span></td>
                <td style={{ color: "#6B7280", fontSize: 13 }}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ГЛАВНЫЙ КОМПОНЕНТ ────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState("student");
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-brand">IELTS <span>Family</span> Coach</div>
          <div className="nav-tabs">
            <button className={`nav-tab ${role === "student" ? "active" : ""}`}
              onClick={() => { setRole("student"); setPage("dashboard"); }}>
              👩‍🎓 Ученик
            </button>
            <button className={`nav-tab ${role === "parent" ? "active" : ""}`}
              onClick={() => { setRole("parent"); setPage("dashboard"); }}>
              👨‍👩‍👧 Родитель
            </button>
          </div>
          <div className="nav-user">
            {role === "student" ? (
              <>
                <span style={{ fontSize: 13 }}>🔥 Серия 7 дней</span>
                <div className="avatar">А</div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Айша</span>
              </>
            ) : (
              <>
                <div className="avatar" style={{ background: "linear-gradient(135deg, #374151, #6B7280)" }}>Р</div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Вид родителя</span>
              </>
            )}
          </div>
        </nav>

        {role === "student" && (
          <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 2rem", display: "flex", gap: 4 }}>
            {[
              { id: "dashboard", label: "🏠 Главная" },
              { id: "task", label: "✍️ Задание дня" },
            ].map((t) => (
              <button key={t.id} onClick={() => setPage(t.id)} style={{
                padding: "10px 16px", border: "none", background: "transparent",
                cursor: "pointer", fontSize: 14, fontWeight: 500,
                color: page === t.id ? "#6C63FF" : "#6B7280",
                borderBottom: page === t.id ? "2px solid #6C63FF" : "2px solid transparent",
                transition: "all 0.2s",
              }}>
                {t.label}
              </button>
            ))}
          </div>
        )}

        {role === "student" && page === "dashboard" && <StudentDashboard onGoToTask={() => setPage("task")} />}
        {role === "student" && page === "task" && <StudentTaskPage />}
        {role === "parent" && <ParentDashboard />}
      </div>
    </>
  );
}
