const remaining = questions.map((_, i) => i).filter((i) => !asked.includes(i));
  if (remaining.length === 0) {
    mem = null;
    if (!state.done) {                       // объявляем финал только один раз
      await sendMessage({ chatId: gid, text: "🏁 Викторина «Знай свой ZOND» пройдена — все вопросы разобраны. Спасибо за участие!\nИтоги — по команде /рейтинг 🏆" });
    }
    await saveState({ currentQ: null, asked, done: true }, sha);
    return;
  }
